import { blockRegistry } from './blockRegistry';
import { heroDefinition } from './definitions/hero';
import { featuresDefinition } from './definitions/features';
import { servicesDefinition } from './definitions/services';
import { textImageDefinition } from './definitions/textImage';
import { ctaDefinition } from './definitions/cta';
import { headerDefinition } from './definitions/header';
import {
  galleryDefinition,
  statisticsDefinition,
  pricingDefinition,
  teamDefinition,
  reviewsDefinition,
  faqDefinition,
  contactsDefinition,
  footerDefinition,
} from './definitions/extraBlocks';

// Register all 14 core blocks
blockRegistry.registerBlock(headerDefinition);
blockRegistry.registerBlock(heroDefinition);
blockRegistry.registerBlock(featuresDefinition);
blockRegistry.registerBlock(servicesDefinition);
blockRegistry.registerBlock(textImageDefinition);
blockRegistry.registerBlock(ctaDefinition);
blockRegistry.registerBlock(galleryDefinition);
blockRegistry.registerBlock(statisticsDefinition);
blockRegistry.registerBlock(pricingDefinition);
blockRegistry.registerBlock(teamDefinition);
blockRegistry.registerBlock(reviewsDefinition);
blockRegistry.registerBlock(faqDefinition);
blockRegistry.registerBlock(contactsDefinition);
blockRegistry.registerBlock(footerDefinition);

export * from './types';
export * from './blockRegistry';
export {
  headerDefinition,
  heroDefinition,
  featuresDefinition,
  servicesDefinition,
  textImageDefinition,
  ctaDefinition,
  galleryDefinition,
  statisticsDefinition,
  pricingDefinition,
  teamDefinition,
  reviewsDefinition,
  faqDefinition,
  contactsDefinition,
  footerDefinition,
};
