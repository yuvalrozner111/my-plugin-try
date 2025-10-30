# EventBus (Pub/Sub) Mechanism

This document describes the application's global Event Bus, a publish-subscribe (Pub/Sub) system for fully decoupled communication.

## 1. Core Concept: State vs. Events

The application has two primary mechanisms for decoupled communication, each with a specific job:

1.  **MobX Stores (via Context):**
    * **Purpose:** Sharing **STATE**.
    * **Analogy:** A public bulletin board.
    * **Use Case:** A plugin needs to know the *current value* of something. (e.g., "What is the current user's name?"). The plugin reads directly from the `UserStore`.
    * **Coupling:** The consumer is coupled to the **store's API** (it must know `userStore.user.name`).

2.  **EventBus (Pub/Sub):**
    * **Purpose:** Broadcasting **EVENTS**.
    * **Analogy:** A radio station megaphone.
    * **Use Case:** A plugin needs to announce "I just did something!" without caring who (if anyone) is listening. (e.g., "The user's name just changed!").
    * **Coupling:** The publisher and subscriber are only coupled to a **topic name** (a string). They have zero knowledge of each other. This is the highest level of decoupling.

## 2. How It Works

The system is a single, application-wide `EventBus` instance, defined in `src/services/EventBus.js`.

This `eventBus` instance is automatically **injected** into all stores (both host and plugin) that extend the `GenericStore` base class.

* At startup, `main.jsx` injects the `eventBus` into `UserStore` and `PluginStore`.
* The `PluginStore` (our registry) then automatically injects the `eventBus` into every plugin store it registers.
* The `GenericStore` (the base class) provides the `setEventBus(bus)` method and stores the reference in `this.eventBus`.

**Result:** Any store extending `GenericStore` can safely access the event bus via `this.eventBus`.

## 3. How to Use: The API

The `EventBus` class provides three simple methods:

### `emit(event, [payload])`

Broadcasts an event to all listeners.

* `event` (string): The name of the topic.
* `payload` (any): Optional data to send with the event. It's best practice to send an object.

```javascript
// In any store
this.eventBus.emit('myPlugin:dataUpdated', {
  userId: '123',
  newStatus: 'completed'
});
```

### `on(event, callback)`

Subscribes to an event.
* `event` (string): The name of the topic to listen for.
* `callback` (function): The function to execute when the event is emitted. This function will receive the `payload` as its only argument.

```javascript
// In any store
this.eventBus.on('myPlugin:dataUpdated', (payload) => {
  console.log('Received data update:', payload);
  this.handleDataUpdate(payload);
});
```

### `off(event, callback)`
Unsubscribes from an event.
* `event` (string): The name of the topic to stop listening for.
* `callback` (function): The function to remove from the event's listener list.

```javascript
// To unsubscribe, you must have a reference to the original handler
const myHandler = (payload) => { /* ... */ };
this.eventBus.on('myPlugin:dataUpdated', myHandler);

// ...later
this.eventBus.off('myPlugin:dataUpdated', myHandler);
```