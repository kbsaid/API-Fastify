const items = require("../Items");
const {
  getItem,
  getItems,
  addItem,
  deleteItem,
  updateItem,
} = require("../controller/controller.items");

function itemRoute(fastify, options, done) {
  const item = {
    type: "object",
    properties: {
      id: { type: "integer" },
      name: { type: "string" },
    },
  };
  const getItemsOpts = {
    schema: {
      response: {
        200: {
          type: "array",
          items: {
            item,
          },
        },
      },
    },
    handler: getItems,
  };

  const getItemOpts = {
    schema: {
      response: {
        200: item,
      },
    },
    handler: getItem,
  };

  const postItemOpts = {
    schema: {
      body: {
        type: "object",
        required: ["name"],
        properties: {name: {type: "string" }},
      },
      response: {
        201: item,
      },
    },
    handler: addItem,
  };

  const deleteItemOpts = {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
    handler: deleteItem,
  }
  
  const updateItemOpts = {
    schema: {
      response: {
        200: item,
      },
    },
    handler: updateItem,
  }

  // Get all
  fastify.get("/items", getItemsOpts);

  // Get single
  fastify.get("/items/:id", getItemOpts);

  // Add item
  fastify.post("/items", postItemOpts);

   // Delete item
   fastify.delete('/items/:id', deleteItemOpts)

   // Update item
   fastify.put('/items/:id', updateItemOpts)

  done();
}

module.exports = itemRoute;
