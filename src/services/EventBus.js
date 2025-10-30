/**
 * A simple, lightweight event bus for decoupled communication.
 * Allows different parts of the app (host or plugins) to
 * publish events and subscribe to them without knowing
 * about each other.
 */
class EventBus {
  constructor() {
    this.listeners = {};
  }

  /**
   * Subscribe to an event.
   * @param {string} event - The name of the event topic.
   * @param {function} callback - The function to call when the event is emitted.
   */
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  /**
   * Unsubscribe from an event.
   * @param {string} event - The name of the event topic.
   * @param {function} callback - The specific callback to remove.
   */
  off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  /**
   * Emit an event to all subscribers.
   * @param {string} event - The name of the event topic.
   * @param {*} [payload] - The data to send to all listeners.
   */
  emit(event, payload) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach((callback) => callback(payload));
  }
}

// Export a single, shared instance for the entire application
export const eventBus = new EventBus();