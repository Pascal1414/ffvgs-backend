'use strict';

/**
 * home-article service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::home-article.home-article');
