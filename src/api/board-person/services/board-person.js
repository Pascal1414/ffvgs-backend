'use strict';

/**
 * board-person service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::board-person.board-person');
