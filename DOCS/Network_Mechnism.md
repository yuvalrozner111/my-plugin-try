# Developer Guide: Using the Networking Service in a Plugin

This guide explains how to perform network requests (GraphQL queries, mutations, and subscriptions) from your plugin.

The core architecture is designed so that plugins do not make network calls directly. Instead, they use a central, host-provided service. This service handles authentication, headers, and global error handling.

The **recommended pattern** is to handle all data fetching inside your plugin's MobX store (`MyPluginStore.js`).

---

## Step 1: Define Your Plugin's GraphQL Queries

First, create a `graphql/` folder in your plugin to store your query strings.

1.  **Create the directory:**
    `src/plugins/MyPlugin/graphql/`

2.  **Create a `queries.js` file:**
    `src/plugins/MyPlugin/graphql/queries.js`

3.  **Define your queries using `gql`:** You must install `@apollo/client` if it's not already a dependency.

    **File: `src/plugins/MyPlugin/graphql/queries.js`**
    ```javascript
    import { gql } from '@apollo/client';
    
    // A query specific to this plugin
    export const GET_MY_PLUGIN_DATA = gql`
      query GetMyPluginData($id: ID!) {
        myPluginData(id: $id) {
          id
          value
          somePluginSpecificField
        }
      }
    `;
    
    // A mutation specific to this plugin
    export const UPDATE_MY_PLUGIN_DATA = gql`
      mutation UpdateMyPluginData($id: ID!, $value: String!) {
        updateMyPluginData(id: $id, value: $value) {
          id
          value
        }
      }
    `;
    ```

---

## Step 2: Use the Network Service in Your Store (Recommended)

Your plugin's store (e.g., `TemplatePluginStore.js`) automatically receives the network service via dependency injection, as long as it extends `GenericStore`. It will be available as `this.graphqlMethods`.

Here is how you would modify the `TemplatePluginStore` to fetch data.

**File: `src/plugins/TemplatePlugin/TemplatePluginStore.js`**
```javascript
import { makeObservable, observable, action, flow } from 'mobx';
import { GenericStore } from '/src/stores/GenericStore';
// 1. Import your plugin's query
import { GET_MY_PLUGIN_DATA } from './graphql/queries.js'; 

/**
 * This is the custom store for the "TemplatePlugin" plugin.
 */
export class TemplatePluginStore extends GenericStore { 
  exampleValue = 99999;
  
  // 2. Add observable state to hold your data
  pluginData = null;
  // 'status' is already available from GenericStore

  constructor() {
    super();
    makeObservable(this, {
      exampleValue: observable,
      pluginData: observable, // 3. Make your new state observable
      setExampleValue: action,
      fetchMyData: flow,      // 4. Register your new flow function
    });
  }

  setExampleValue(value) {
    this.exampleValue = value;
  }

  // 5. Create your data-fetching function as a 'flow' (a generator)
  *fetchMyData(id) {
    // 6. Check if the service is available (it should be)
    if (!this.graphqlMethods) {
      console.error('Network service is not available in TemplatePluginStore.');
      return;
    }
    
    this.status = 'loading'; // Set status from GenericStore
    this.pluginData = null;

    try {
      // 7. Use the injected service to run the query
      const { data } = yield this.graphqlMethods.doQuery(
        GET_MY_PLUGIN_DATA, // Your query
        { id }              // Your variables
      );

      // 8. Update the store's state with the result
      this.pluginData = data.myPluginData;
      this.status = 'done';

    } catch (error) {
      console.error('Failed to fetch plugin data:', error);
      this.status = 'error';
    }
  }
}