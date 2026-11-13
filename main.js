/**
 * Sweet Crumbs Artisan Bakery & Patisserie
 * Pure Vanilla JavaScript (ES6+) Client Application
 * Runs directly in any modern browser (file://, static server, or GitHub Pages)
 */

(() => {
  'use strict';

  // 1. Bakery Configuration
  const bakeryConfig = {
    name: 'Sweet Crumbs Artisan Bakery & Patisserie',
    tagline: 'Handcrafted Sourdoughs, Pure Butter Pastries & Bespoke Celebration Cakes',
    phone: '+1 (555) 742-8732',
    whatsappNumber: '15557428732', // International digits without + or spaces
    email: 'hello@sweetcrumbsbakery.com',
    address: '42 Artisan Flour Lane, Heritage Quarter, Suite 102',
    hours: 'Tuesday – Sunday: 7:00 AM – 7:00 PM (Fresh batches at 7:00 AM & 2:00 PM) · Mondays Closed',
    priceNotice: 'Sample prices shown as placeholders until verified by the bakery owner.',
    currencySymbol: '$'
  };

  const STORAGE_KEYS = {
    enquiries: 'sweet_crumbs_enquiries_v1',
    productOverrides: 'sweet_crumbs_product_overrides_v1'
  };

  // Helper: Safe HTML Escaping for dynamic strings
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // 2. Master Product Dataset
  const baseProductsData = [
    {
      id: 'cake-belgian-truffle',
      name: 'Belgian Dark Chocolate Silk Cake',
      category: 'cakes',
      subcategory: 'celebration',
      shortDescription: 'Layers of 70% Valrhona dark chocolate sponge enveloped in silky ganache and chocolate curls.',
      detailedDescription: 'Handcrafted with French Valrhona cocoa and churned cream butter. Moist crumb soaked lightly with vanilla bean infusion and finished with an ultra-smooth dark chocolate mirror glaze.',
      price: 38.00,
      formattedPrice: '$38.00',
      isPricePlaceholder: true,
      sizeOptions: ['500g (Serves 4-6)', '1kg (Serves 8-10)', '1.5kg (Serves 12-14)'],
      defaultSize: '1kg (Serves 8-10)',
      imageUrl: 'assets/images/chocolate-silk-cake.jpg',
      isBestSeller: true,
      isSpecialPastry: false,
      isAvailable: true,
      availabilityStatus: 'Baked Daily',
      batchSchedule: 'Daily morning bake (9:00 AM) · Custom orders 24h prior',
      shelfLifeDays: 3,
      dateLabelType: 'best-before',
      shelfLifeDetail: 'Best consumed within 72 hours of purchase. Keep chilled in provided box.',
      storageType: 'refrigerated',
      storageInstructions: 'Refrigerate at 2°C–4°C in its airtight bakery cake box. Remove from fridge 30–40 minutes before cutting.',
      handlingTips: 'Carry cake box supported from underneath base with both hands. Never tilt.',
      ingredients: ['70% Dark Chocolate', 'Unsalted Butter', 'Unbleached Wheat Flour', 'Free-Range Eggs', 'Organic Cane Sugar', 'Heavy Cream'],
      allergens: ['Dairy', 'Eggs', 'Gluten', 'May contain traces of Tree Nuts'],
      isVegetarian: true,
      isEggless: false
    },
    {
      id: 'bread-country-sourdough',
      name: 'Artisan 48-Hour Heritage Country Sourdough',
      category: 'bread',
      subcategory: 'artisan-loaf',
      shortDescription: 'Naturally leavened with our 8-year wild starter, boasting an open rustic crumb and blistering caramelized crust.',
      detailedDescription: 'Slow, cold fermented for 48 hours to develop rich lactic sour notes and enhanced digestibility. Baked on stone deck hearths with high steam.',
      price: 8.50,
      formattedPrice: '$8.50',
      isPricePlaceholder: true,
      sizeOptions: ['Full Loaf (approx. 850g)', 'Half Loaf (approx. 425g)'],
      defaultSize: 'Full Loaf (approx. 850g)',
      imageUrl: 'assets/images/country-sourdough.jpg',
      isBestSeller: true,
      isSpecialPastry: false,
      isAvailable: true,
      availabilityStatus: 'Baked Daily',
      batchSchedule: 'Fresh from hearth ovens at 7:00 AM and 2:00 PM daily',
      shelfLifeDays: 5,
      dateLabelType: 'best-before',
      shelfLifeDetail: 'Peak crust crunch in first 24 hours. Crumb remains tender for 4–5 days.',
      storageType: 'ambient',
      storageInstructions: 'Store cut-side down on wooden board or in breathable kraft bag. NEVER refrigerate.',
      handlingTips: 'To revive crust, spritz lightly with water and warm at 180°C for 6–8 minutes.',
      ingredients: ['Stoneground Bread Flour', 'Organic Whole Rye Flour', 'Filtered Water', 'Natural Wild Yeast Culture', 'Guérande Sea Salt'],
      allergens: ['Gluten'],
      isVegetarian: true,
      isEggless: true
    },
    {
      id: 'pastry-butter-croissant',
      name: 'Pure Normandy Butter Croissant',
      category: 'pastries',
      subcategory: 'croissants',
      shortDescription: 'Classic 27-layer French viennoiserie laminated with 84% AOP butter for honeycomb aeration and delicate flakiness.',
      detailedDescription: 'A 3-day lamination journey resulting in paper-thin crisp outer layers that shatter upon biting, revealing a buttery, airy honeycomb interior.',
      price: 4.25,
      formattedPrice: '$4.25',
      isPricePlaceholder: true,
      sizeOptions: ['Single Croissant', 'Box of 4', "Baker's Half-Dozen (6)"],
      defaultSize: 'Single Croissant',
      imageUrl: 'assets/images/butter-croissant.jpg',
      isBestSeller: true,
      isSpecialPastry: true,
      isAvailable: true,
      availabilityStatus: 'Baked Daily',
      batchSchedule: 'Baked three times daily: 7:00 AM, 10:30 AM, and 2:30 PM',
      shelfLifeDays: 1,
      dateLabelType: 'best-before',
      shelfLifeDetail: 'Best enjoyed the day of baking within 12 hours.',
      storageType: 'ambient',
      storageInstructions: 'Store in breathable paper bag at room temperature. To re-crisp, bake at 175°C for 3 minutes.',
      handlingTips: 'Do not microwave; microwaves make laminated puff soggy.',
      ingredients: ['French T55 Flour', 'Normandy Churned Butter (84% Fat)', 'Whole Milk', 'Cane Sugar', 'Fresh Yeast', 'Sea Salt'],
      allergens: ['Dairy', 'Gluten'],
      isVegetarian: true,
      isEggless: true
    },
    {
      id: 'cookies-sea-salt-chocolate',
      name: 'Valrhona Sea Salt Chunky Chocolate Cookies',
      category: 'cookies',
      subcategory: 'biscuit',
      shortDescription: 'Brown butter dough loaded with hand-chopped 64% chocolate puddles and sprinkled with Maldon flaky sea salt.',
      detailedDescription: 'Aged for 36 hours in cold retarder for deep toffee undertones. Soft, fudgy center with chewy caramelised edges.',
      price: 3.75,
      formattedPrice: '$3.75',
      isPricePlaceholder: true,
      sizeOptions: ['Single Jumbo Cookie', 'Tin of 6', 'Gift Box of 12'],
      defaultSize: 'Tin of 6',
      imageUrl: 'assets/images/sea-salt-cookies.jpg',
      isBestSeller: true,
      isSpecialPastry: false,
      isAvailable: true,
      availabilityStatus: 'In Stock',
      batchSchedule: 'Baked daily every morning',
      shelfLifeDays: 14,
      dateLabelType: 'best-before',
      shelfLifeDetail: 'Keeps chewy freshness for up to 14 days when stored in an airtight tin.',
      storageType: 'airtight-tin',
      storageInstructions: 'Keep in an airtight tin or sealed glass jar in a cool, dry pantry.',
      handlingTips: 'Warm in oven for 90 seconds at 160°C for freshly baked molten center.',
      ingredients: ['Brown Butter', 'Valrhona 64% Chocolate', 'Muscovado Sugar', 'Flour', 'Eggs', 'Vanilla', 'Maldon Flakes'],
      allergens: ['Dairy', 'Eggs', 'Gluten'],
      isVegetarian: true,
      isEggless: false
    },
    {
      id: 'cupcakes-vanilla-raspberry',
      name: 'Madagascar Vanilla & Raspberry Buttercream Cupcakes',
      category: 'cupcakes',
      subcategory: 'tea-cake',
      shortDescription: 'Velvety vanilla bean sponge with a house-made raspberry compote core, crowned with Swiss meringue buttercream.',
      detailedDescription: 'Fluffy crumb infused with real bourbon vanilla seeds. Tart organic raspberry reduction balances silky buttercream.',
      price: 4.50,
      formattedPrice: '$4.50',
      isPricePlaceholder: true,
      sizeOptions: ['Box of 4', 'Box of 6', 'Party Pack of 12'],
      defaultSize: 'Box of 6',
      imageUrl: 'assets/images/vanilla-raspberry-cupcakes.jpg',
      isBestSeller: true,
      isSpecialPastry: false,
      isAvailable: true,
      availabilityStatus: 'In Stock',
      batchSchedule: 'Daily morning assembly (8:30 AM)',
      shelfLifeDays: 2,
      dateLabelType: 'best-before',
      shelfLifeDetail: 'Consume within 48 hours for fluffiest crumb.',
      storageType: 'cool-dry',
      storageInstructions: 'Keep in domed box at cool room temperature (under 21°C).',
      handlingTips: 'Carry upright in provided individual compartment inserts.',
      ingredients: ['Cake Flour', 'Bourbon Vanilla Bean', 'Unsalted Butter', 'Fresh Raspberries', 'Egg Whites', 'Cane Sugar'],
      allergens: ['Dairy', 'Eggs', 'Gluten'],
      isVegetarian: true,
      isEggless: false
    },
    {
      id: 'pastry-pain-au-chocolat',
      name: 'Valrhona Double Chocolate Pain au Chocolat',
      category: 'pastries',
      subcategory: 'chocolate',
      shortDescription: 'Golden flaky laminated dough filled with two generous batons of rich Valrhona 55% bittersweet dark chocolate.',
      detailedDescription: 'Folded with cultured European butter to yield paper-thin crisp layers surrounding molten chocolate batons.',
      price: 4.75,
      formattedPrice: '$4.75',
      isPricePlaceholder: true,
      sizeOptions: ['Single Pastry', 'Box of 4'],
      defaultSize: 'Single Pastry',
      imageUrl: 'assets/images/pain-au-chocolat.jpg',
      isBestSeller: true,
      isSpecialPastry: true,
      isAvailable: true,
      availabilityStatus: 'Baked Daily',
      batchSchedule: 'Fresh out of oven at 7:00 AM & 1:00 PM',
      shelfLifeDays: 1,
      dateLabelType: 'best-before',
      shelfLifeDetail: 'Best consumed within 12–18 hours.',
      storageType: 'ambient',
      storageInstructions: 'Keep in paper bag at room temperature. Never plastic wrap.',
      handlingTips: 'Crisp for 3 mins in oven at 170°C for melted chocolate batons.',
      ingredients: ['T55 Pastry Flour', 'Normandy Butter 84%', 'Valrhona Chocolate Batons', 'Yeast', 'Milk', 'Sugar', 'Sea Salt'],
      allergens: ['Dairy', 'Gluten'],
      isVegetarian: true,
      isEggless: true
    },
    {
      id: 'pastry-chocolate-eclair',
      name: 'Belgian Dark Chocolate Ganache Éclair',
      category: 'pastries',
      subcategory: 'chocolate',
      shortDescription: 'Crisp golden choux pastry filled with dark chocolate crémeux and coated with shiny cocoa glaze.',
      detailedDescription: 'Light choux dough piped with intense 66% chocolate pastry cream, finished with a reflective cocoa mirror glaze.',
      price: 5.50,
      formattedPrice: '$5.50',
      isPricePlaceholder: true,
      sizeOptions: ['Single Éclair', 'Trio Box of 3', 'Set of 6'],
      defaultSize: 'Single Éclair',
      imageUrl: 'assets/images/chocolate-eclair.jpg',
      isBestSeller: false,
      isSpecialPastry: true,
      isAvailable: true,
      availabilityStatus: 'In Stock',
      batchSchedule: 'Daily morning pastry counter 8:00 AM',
      shelfLifeDays: 1,
      dateLabelType: 'use-by',
      shelfLifeDetail: 'Consume within 24 hours. Requires continuous refrigeration.',
      storageType: 'refrigerated',
      storageInstructions: 'Refrigerate immediately at 2°C–4°C.',
      handlingTips: 'Keep box level to protect mirror glaze.',
      ingredients: ['Eggs', 'Butter', 'Flour', 'Dark Chocolate 66%', 'Milk', 'Egg Yolks', 'Cornstarch', 'Cocoa Butter'],
      allergens: ['Dairy', 'Eggs', 'Gluten'],
      isVegetarian: true,
      isEggless: false
    },
    {
      id: 'pastry-vanilla-millefeuille',
      name: 'Tahitian Vanilla Bean Mille-Feuille',
      category: 'pastries',
      subcategory: 'cream',
      shortDescription: 'Three layers of caramelized puff pastry alternating with luscious Tahitian vanilla diplomat cream.',
      detailedDescription: 'Inverted puff pastry caramelized for crunch, layered with light-as-air vanilla mousseline.',
      price: 6.25,
      formattedPrice: '$6.25',
      isPricePlaceholder: true,
      sizeOptions: ['Individual Slice', 'Full Gateau (Serves 6)'],
      defaultSize: 'Individual Slice',
      imageUrl: 'assets/images/artisan-bread-pastry.jpg',
      isBestSeller: true,
      isSpecialPastry: true,
      isAvailable: true,
      availabilityStatus: 'Limited Batch',
      batchSchedule: 'Assembled fresh at 10:00 AM daily (Only 35 portions)',
      shelfLifeDays: 1,
      dateLabelType: 'use-by',
      shelfLifeDetail: 'Consume within 12 hours for peak crunch before cream softens pastry.',
      storageType: 'refrigerated',
      storageInstructions: 'Keep chilled below 4°C until ready to serve.',
      handlingTips: 'Use serrated knife placed horizontally with gentle sawing motion.',
      ingredients: ['Pastry Butter', 'Flour', 'Tahitian Vanilla Pods', 'Whole Milk', 'Cream', 'Halal Gelatine', 'Sugar', 'Egg Yolks'],
      allergens: ['Dairy', 'Eggs', 'Gluten'],
      isVegetarian: false,
      isEggless: false
    },
    {
      id: 'pastry-paris-brest',
      name: 'Piedmont Hazelnut Paris-Brest',
      category: 'pastries',
      subcategory: 'cream',
      shortDescription: 'Choux pastry wheel encrusted with toasted almonds, filled with rich praline mousseline and hazelnut crunch.',
      detailedDescription: 'Inspired by the historic French cycling race. Golden choux crown generously filled with 100% stoneground Piedmont hazelnut paste whipped with silky French butter.',
      price: 6.50,
      formattedPrice: '$6.50',
      isPricePlaceholder: true,
      sizeOptions: ['Individual (9cm)', 'Large Wheel (Serves 6)'],
      defaultSize: 'Individual (9cm)',
      imageUrl: 'assets/images/paris-brest.jpg',
      isBestSeller: false,
      isSpecialPastry: true,
      isAvailable: true,
      availabilityStatus: 'In Stock',
      batchSchedule: 'Daily morning batch',
      shelfLifeDays: 2,
      dateLabelType: 'use-by',
      shelfLifeDetail: 'Consume within 36 hours. Best on first day.',
      storageType: 'refrigerated',
      storageInstructions: 'Store chilled in original bakery box at 2°C–4°C.',
      handlingTips: 'Take out 15 minutes before serving for smoothest praline texture.',
      ingredients: ['Choux Dough', 'Flaked Almonds', 'Piedmont Hazelnut Praline', 'Butter', 'Egg Yolks', 'Cornstarch', 'Milk'],
      allergens: ['Dairy', 'Eggs', 'Gluten', 'Tree Nuts (Hazelnuts, Almonds)'],
      isVegetarian: true,
      isEggless: false
    },
    {
      id: 'pastry-raspberry-pistachio-tart',
      name: 'Fresh Raspberry & Bronte Pistachio Tart',
      category: 'pastries',
      subcategory: 'fruit',
      shortDescription: 'Sweet shortcrust pastry filled with roasted pistachio frangipane, topped with fresh raspberries and coulis.',
      detailedDescription: 'Crisp butter tart shell filled with Sicilian Bronte pistachio cream, layered with delicate raspberry coulis and fresh plump raspberries.',
      price: 6.75,
      formattedPrice: '$6.75',
      isPricePlaceholder: true,
      sizeOptions: ['Individual Tart (8cm)', 'Large Tart (22cm, Serves 6-8)'],
      defaultSize: 'Individual Tart (8cm)',
      imageUrl: 'assets/images/raspberry-pistachio-tart.jpg',
      isBestSeller: true,
      isSpecialPastry: true,
      isAvailable: true,
      availabilityStatus: 'Baked Daily',
      batchSchedule: 'Assembled fresh each morning with local berries',
      shelfLifeDays: 1,
      dateLabelType: 'best-before',
      shelfLifeDetail: 'Consume within 24 hours to preserve berry firmness.',
      storageType: 'refrigerated',
      storageInstructions: 'Keep in refrigerator at 2°C–4°C.',
      handlingTips: 'Carry flat and steady on the base of the box.',
      ingredients: ['Shortcrust Butter Pastry', 'Bronte Pistachio Flour', 'Fresh Raspberries', 'Cane Sugar', 'Eggs', 'Pectin'],
      allergens: ['Dairy', 'Eggs', 'Gluten', 'Tree Nuts (Pistachios)'],
      isVegetarian: true,
      isEggless: false
    },
    {
      id: 'pastry-almond-croissant',
      name: 'Twice-Baked Roasted Almond Croissant',
      category: 'pastries',
      subcategory: 'croissants',
      shortDescription: 'Classic butter croissant brushed with orange blossom syrup, filled with almond frangipane, and toasted flaked nuts.',
      detailedDescription: 'Signature double-baked morning favorite. Infused with floral vanilla syrup and filled with almond cream.',
      price: 5.25,
      formattedPrice: '$5.25',
      isPricePlaceholder: true,
      sizeOptions: ['Single Pastry', 'Box of 4'],
      defaultSize: 'Single Pastry',
      imageUrl: 'assets/images/almond-croissant.jpg',
      isBestSeller: true,
      isSpecialPastry: true,
      isAvailable: true,
      availabilityStatus: 'Baked Daily',
      batchSchedule: 'Twice baked at 8:00 AM & 12:00 PM',
      shelfLifeDays: 2,
      dateLabelType: 'best-before',
      shelfLifeDetail: 'Stays delicious for 2 days. Reheating brings frangipane back to molten perfection.',
      storageType: 'ambient',
      storageInstructions: 'Store at room temperature in paper bag.',
      handlingTips: 'Warm in 170°C oven for 4 minutes for maximum almond aroma.',
      ingredients: ['Butter Croissant', 'California Almond Meal', 'Orange Blossom Syrup', 'Butter', 'Eggs', 'Flaked Almonds', 'Icing Sugar'],
      allergens: ['Dairy', 'Eggs', 'Gluten', 'Tree Nuts (Almonds)'],
      isVegetarian: true,
      isEggless: false
    },
    {
      id: 'pastry-peach-danish',
      name: 'Spiced Caramelized Peach Danish',
      category: 'pastries',
      subcategory: 'danish',
      shortDescription: 'Laminated Danish dough with pockets of Madagascar vanilla bean pastry cream and poached spiced peaches.',
      detailedDescription: 'Delicate flaked pastry cradling slow-poached summer peaches with a hint of cinnamon and apricot glaze.',
      price: 5.00,
      formattedPrice: '$5.00',
      isPricePlaceholder: true,
      sizeOptions: ['Single Danish', 'Box of 4'],
      defaultSize: 'Single Danish',
      imageUrl: 'assets/images/peach-danish.jpg',
      isBestSeller: false,
      isSpecialPastry: true,
      isAvailable: true,
      availabilityStatus: 'In Stock',
      batchSchedule: 'Daily morning bake (7:30 AM)',
      shelfLifeDays: 1,
      dateLabelType: 'best-before',
      shelfLifeDetail: 'Consume within 24 hours of purchase.',
      storageType: 'ambient',
      storageInstructions: 'Store in cool ambient pantry in breathable container.',
      handlingTips: 'Best served at mild room temperature.',
      ingredients: ['Danish Yeast Pastry', 'Poached Peaches', 'Vanilla Pastry Cream', 'Apricot Jam Glaze', 'Cinnamon'],
      allergens: ['Dairy', 'Eggs', 'Gluten'],
      isVegetarian: true,
      isEggless: false
    },
    {
      id: 'pastry-autumn-plum-seasonal',
      name: 'Seasonal Spiced Plum & Cardamom Brioche Knot',
      category: 'pastries',
      subcategory: 'seasonal',
      shortDescription: 'Enriched buttery brioche twisted with freshly ground green cardamom, black plum compote, and pearl sugar.',
      detailedDescription: 'Seasonal festival specialty! Slow-proved Swedish cardamom dough ribboned with sweet-tart spiced plum reduction.',
      price: 4.95,
      formattedPrice: '$4.95',
      isPricePlaceholder: true,
      sizeOptions: ['Single Knot', 'Box of 4'],
      defaultSize: 'Single Knot',
      imageUrl: 'assets/images/artisan-bread-pastry.jpg',
      isBestSeller: false,
      isSpecialPastry: true,
      isAvailable: true,
      availabilityStatus: 'Limited Batch',
      batchSchedule: 'Autumn & Festive Season special morning batch',
      shelfLifeDays: 2,
      dateLabelType: 'best-before',
      shelfLifeDetail: 'Stays soft for 48 hours.',
      storageType: 'ambient',
      storageInstructions: 'Keep in paper bag or breadbox at room temperature.',
      handlingTips: 'Warm 20 seconds in gentle oven for fragrant aromatics.',
      ingredients: ['Brioche Flour', 'Butter', 'Whole Milk', 'Cardamom', 'Plum Puree', 'Pearl Sugar', 'Yeast'],
      allergens: ['Dairy', 'Eggs', 'Gluten'],
      isVegetarian: true,
      isEggless: false
    },
    {
      id: 'cake-strawberry-chiffon',
      name: 'Japanese Strawberry Chantilly Chiffon',
      category: 'cakes',
      subcategory: 'celebration',
      shortDescription: 'Featherlight Japanese sponge layered with fresh organic strawberries and whipped Hokkaido-style milk cream.',
      detailedDescription: 'Delicate, airy sponge cake that melts on the tongue, balanced with naturally sweet sliced strawberries.',
      price: 42.00,
      formattedPrice: '$42.00',
      isPricePlaceholder: true,
      sizeOptions: ['6-inch (Serves 6)', '8-inch (Serves 10)', '10-inch (Serves 16)'],
      defaultSize: '8-inch (Serves 10)',
      imageUrl: 'assets/images/strawberry-chiffon.jpg',
      isBestSeller: true,
      isSpecialPastry: false,
      isAvailable: true,
      availabilityStatus: 'Pre-order 24h',
      batchSchedule: 'Assembled fresh to order',
      shelfLifeDays: 2,
      dateLabelType: 'use-by',
      shelfLifeDetail: 'Must be kept refrigerated. Consume within 48 hours.',
      storageType: 'refrigerated',
      storageInstructions: 'Always keep refrigerated between 1°C and 4°C.',
      handlingTips: 'Carry cake box with both hands flat under base.',
      ingredients: ['Chiffon Sponge Flour', 'Farm Eggs', 'Fresh Dairy Cream', 'Sweet Strawberries', 'Organic Sugar'],
      allergens: ['Dairy', 'Eggs', 'Gluten'],
      isVegetarian: true,
      isEggless: false
    },
    {
      id: 'bread-seeded-rye',
      name: 'Nordic Seeded Dark Rye Batard',
      category: 'bread',
      subcategory: 'artisan-loaf',
      shortDescription: '100% whole grain rye loaf dense with toasted pumpkin, sunflower, and toasted golden flaxseeds.',
      detailedDescription: 'Baltic rye fermented with natural sourdough over 36 hours. Dense, nutty, and naturally long-keeping.',
      price: 9.00,
      formattedPrice: '$9.00',
      isPricePlaceholder: true,
      sizeOptions: ['Batard (approx 900g)', 'Sliced in Loaf Bag'],
      defaultSize: 'Batard (approx 900g)',
      imageUrl: 'assets/images/almond-croissant.jpg',
      isBestSeller: false,
      isSpecialPastry: false,
      isAvailable: true,
      availabilityStatus: 'Baked Daily',
      batchSchedule: 'Daily bake at 7:00 AM',
      shelfLifeDays: 7,
      dateLabelType: 'best-before',
      shelfLifeDetail: 'Improves in flavor on day 2 and stays fresh for 7 days in a dry bread box.',
      storageType: 'ambient',
      storageInstructions: 'Wrap in linen cloth or breathable paper bag at room temperature.',
      handlingTips: 'Slice thinly with a sharp serrated knife.',
      ingredients: ['Dark Rye Flour', 'Sourdough Culture', 'Pumpkin Seeds', 'Sunflower Seeds', 'Flaxseeds', 'Molasses', 'Sea Salt'],
      allergens: ['Gluten'],
      isVegetarian: true,
      isEggless: true
    }
  ];

  // Hydrate persisted owner edits if present
  function loadProductsWithOverrides() {
    const cloned = baseProductsData.map(item => ({ ...item }));
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.productOverrides);
      if (!raw) return cloned;
      const overrides = JSON.parse(raw);
      if (overrides && typeof overrides === 'object') {
        cloned.forEach(p => {
          const patch = overrides[p.id];
          if (patch) {
            Object.assign(p, patch);
            if (typeof p.price === 'number') {
              p.formattedPrice = `${bakeryConfig.currencySymbol}${p.price.toFixed(2)}`;
            }
          }
        });
      }
    } catch (_err) {
      // Ignore storage access errors in strict private contexts
    }
    return cloned;
  }

  let productsData = loadProductsWithOverrides();

  function saveProductOverride(product) {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.productOverrides);
      const overrides = raw ? JSON.parse(raw) : {};
      overrides[product.id] = {
        price: product.price,
        formattedPrice: product.formattedPrice,
        shelfLifeDays: product.shelfLifeDays,
        batchSchedule: product.batchSchedule,
        isBestSeller: product.isBestSeller,
        isAvailable: product.isAvailable,
        availabilityStatus: product.isAvailable ? product.availabilityStatus : 'Out of Stock',
        isPricePlaceholder: false
      };
      localStorage.setItem(STORAGE_KEYS.productOverrides, JSON.stringify(overrides));
    } catch (_err) {
      // Non-fatal if storage is blocked
    }
  }

  // 3. Community Recipes Dataset
  const recipesData = [
    {
      id: 'recipe-country-sourdough',
      title: 'Artisan 48-Hour Heritage Country Sourdough',
      subtitle: 'Wild yeast sourdough with an open tender crumb and blistering crust',
      category: 'Artisan Bread',
      yieldInfo: '1 Large Loaf (approx. 850g)',
      prepTime: '45 mins hands-on (48h cold fermentation)',
      bakeTime: '42 mins in Dutch oven',
      difficulty: 'Intermediate',
      imageUrl: 'assets/images/country-sourdough.jpg',
      story: 'This recipe is our head baker’s adaptation of our daily bakery country loaf, shared for home bakers who love authentic wild fermentation.',
      approvalNotice: 'Owner-Approved Community Recipe. Baker’s proprietary starter percentages calibrated for home ovens.',
      ingredients: [
        { item: 'Unbleached Bread Flour (12.5% protein)', amount: '400g', bakersPercentage: '80%' },
        { item: 'Stoneground Whole Grain Rye Flour', amount: '100g', bakersPercentage: '20%' },
        { item: 'Filtered Water (lukewarm ~26°C)', amount: '380g', bakersPercentage: '76% (Hydration)' },
        { item: 'Active Ripe Sourdough Starter', amount: '100g', bakersPercentage: '20%' },
        { item: 'Fine Sea Salt (Guérande)', amount: '10g', bakersPercentage: '2%' }
      ],
      steps: [
        { stepNumber: 1, title: 'Autolyse', instruction: 'Mix flours and 360g water until fully combined. Rest covered for 45 minutes.', bakerTip: 'Autolyse develops gluten without mechanical kneading.' },
        { stepNumber: 2, title: 'Incorporate Starter & Salt', instruction: 'Dimple in active starter. Dissolve salt in remaining 20g water and incorporate using Rubaud method for 5 minutes.', bakerTip: 'Resist the urge to add raw flour.' },
        { stepNumber: 3, title: 'Bulk Fermentation & Folds', instruction: 'Rest at 25°C for 4 hours. Perform 4 sets of stretch and folds spaced 30 mins apart during the first 2 hours.', bakerTip: 'Look for dome formation along bowl edges.' },
        { stepNumber: 4, title: 'Pre-shape & Bench Rest', instruction: 'Tip onto floured bench. Shape into round boule. Rest 25 mins.', bakerTip: 'Build surface tension.' },
        { stepNumber: 5, title: 'Final Shape & Cold Retardation', instruction: 'Place into rice-flour dusted banneton. Seal in bag and refrigerate at 4°C for 16–24 hours.', bakerTip: 'Cold fermentation develops complex organic acids.' },
        { stepNumber: 6, title: 'Bake in Steamed Dutch Oven', instruction: 'Bake covered at 250°C for 20 minutes with trapped steam. Remove lid, reduce to 220°C, bake 20 mins until dark chestnut.', bakerTip: 'Cool completely on wire rack for 2 hours before slicing.' }
      ],
      bakerNotes: 'Use non-chlorinated filtered water to keep wild yeast vibrant.',
      storageAfterBaking: 'Store cut-side down on cutting board or inside unbleached paper bag. Re-crisp in 180°C oven for 6 mins.'
    },
    {
      id: 'recipe-french-butter-sables',
      title: 'Traditional Breton Pure Butter Sablés',
      subtitle: 'Melt-in-your-mouth shortbread biscuits with delicate vanilla and sea salt',
      category: 'Cookies & Biscuits',
      yieldInfo: 'Makes approx. 24 biscuits',
      prepTime: '20 mins (+ 2 hrs chilling)',
      bakeTime: '14 mins',
      difficulty: 'Beginner',
      imageUrl: 'assets/images/sea-salt-cookies.jpg',
      story: 'Sablé means "sandy" in French, describing the crumbly, delicate texture created by working high-fat European butter with flour.',
      approvalNotice: 'Owner-Approved Community Recipe. Calibrated for standard home ovens.',
      ingredients: [
        { item: 'European Style Butter (82%+ fat)', amount: '225g' },
        { item: 'Powdered Confectioners Sugar', amount: '100g' },
        { item: 'Pure Madagascar Vanilla Bean Paste', amount: '1 tsp' },
        { item: 'Egg Yolks (room temperature)', amount: '2 large yolks' },
        { item: 'All-Purpose Pastry Flour', amount: '280g' },
        { item: 'Fleur de Sel or Maldon Salt', amount: '3/4 tsp' },
        { item: 'Demerara Sugar (for edge rolling)', amount: '50g' }
      ],
      steps: [
        { stepNumber: 1, title: 'Cream Butter & Sugar', instruction: 'Beat softened butter and sugar for 2 minutes until creamy.' },
        { stepNumber: 2, title: 'Add Yolks & Vanilla', instruction: 'Incorporate egg yolks and vanilla paste until emulsified.' },
        { stepNumber: 3, title: 'Fold Flour & Shape', instruction: 'Fold in flour and salt. Roll into two 4cm-diameter logs.' },
        { stepNumber: 4, title: 'Chill Dough Logs', instruction: 'Wrap in plastic and refrigerate at least 2 hours until firm.' },
        { stepNumber: 5, title: 'Sugar Coat & Slice', instruction: 'Brush logs lightly with water, roll in Demerara sugar, and slice into 1cm rounds.' },
        { stepNumber: 6, title: 'Bake', instruction: 'Bake at 175°C for 13–15 minutes until edges are pale golden. Cool on tray 10 minutes.' }
      ],
      bakerNotes: 'The quality of the butter defines this biscuit. Use the finest churned butter.',
      storageAfterBaking: 'Store in airtight tin with parchment dividers for up to 3 weeks at room temperature.'
    },
    {
      id: 'recipe-fudge-brownies',
      title: 'Double Valrhona Dark Chocolate Espresso Brownies',
      subtitle: 'Ultra-fudgy chocolate squares with crinkly paper-thin tops',
      category: 'Bars & Brownies',
      yieldInfo: 'Makes 16 decadent squares (8x8 inch pan)',
      prepTime: '20 mins',
      bakeTime: '26 mins',
      difficulty: 'Beginner',
      imageUrl: 'assets/images/chocolate-silk-cake.jpg',
      story: 'The secret to the coveted glossy crinkly top is dissolving the sugar completely into whipped warm eggs before folding in warm melted chocolate.',
      approvalNotice: 'Owner-Approved Community Recipe.',
      ingredients: [
        { item: '70% Dark Chocolate (chopped)', amount: '200g' },
        { item: 'Unsalted Butter', amount: '120g' },
        { item: 'Whole Large Eggs', amount: '3 eggs' },
        { item: 'Granulated Sugar', amount: '180g' },
        { item: 'Dark Brown Sugar', amount: '70g' },
        { item: 'Dutch-Processed Cocoa Powder', amount: '30g' },
        { item: 'All-Purpose Flour', amount: '60g' },
        { item: 'Espresso Powder', amount: '1 tsp' },
        { item: 'Flaky Sea Salt', amount: '1 tsp' }
      ],
      steps: [
        { stepNumber: 1, title: 'Melt Chocolate & Butter', instruction: 'Melt dark chocolate and butter over a double boiler. Stir until glossy.' },
        { stepNumber: 2, title: 'Whip Eggs & Sugar', instruction: 'Whip eggs and both sugars on medium-high speed for 5 full minutes until pale, frothy, and doubled in volume.' },
        { stepNumber: 3, title: 'Fold Chocolate', instruction: 'Slowly stream melted chocolate into egg foam with rubber spatula.' },
        { stepNumber: 4, title: 'Sift Dry Ingredients', instruction: 'Sift flour, cocoa, espresso powder, and salt. Fold gently until no dry streaks remain.' },
        { stepNumber: 5, title: 'Bake to Perfection', instruction: 'Bake at 175°C for 24–26 minutes. A toothpick should come out with moist crumbs, never wet batter.' }
      ],
      bakerNotes: 'Chill brownies in fridge for 2 hours before slicing with a hot knife wiped clean between cuts.',
      storageAfterBaking: 'Keeps 5 days in airtight container at room temperature or 10 days refrigerated.'
    }
  ];

  // 4. Product Care & Storage Guidelines
  const storageGuidesData = [
    {
      id: 'guide-bread',
      title: 'Artisan Sourdough & Bread',
      temp: 'Room Temperature (18°C–22°C)',
      container: 'Breathable unbleached paper bag, wooden bread box, or linen sack',
      recommended: 'Consume within 24–48 hours for crisp crust; up to 5 days for sliced toast',
      dos: [
        'Store cut loaf face-down on wooden cutting board to shield crumb moisture.',
        'Use breathable paper or natural linen bag to allow humidity to escape.',
        'For long term (over 5 days), slice entire loaf and freeze in sealed freezer bag with parchment dividers.'
      ],
      donts: [
        'NEVER store in refrigerator! Cold temperatures speed up starch crystallization (retrogradation) by 600%, making crumb stale fast.',
        'Avoid non-perforated plastic bags at room temperature; trapped moisture destroys crust crunch.'
      ],
      revivalTip: 'To restore crust crackle: Mist loaf lightly with water and place in 180°C oven for 6–8 minutes. Crumb turns pillowy and crust becomes freshly blistered.'
    },
    {
      id: 'guide-cakes',
      title: 'Celebration Layer Cakes',
      temp: 'Chilled (2°C–4°C / 36°F–40°F)',
      container: 'Bakery cake box wrapped in clingfilm or sealed cake dome',
      recommended: 'Consume within 48 to 72 hours of purchase',
      dos: [
        'Keep chilled in refrigerator to preserve structural integrity of buttercream and ganache.',
        'Remove from refrigerator 30 to 45 minutes prior to slicing so butter emulsifies back to velvety softness.',
        'Cover exposed cut edges with plastic wrap pressed directly against cake crumb to stop drying out.'
      ],
      donts: [
        'Do not display in direct sunlight or next to warm ovens or heating vents.',
        'Do not freeze fresh cream fruit cakes as thawed fruit bleeds juices into cream.'
      ],
      revivalTip: 'Always slice with a long, thin chef knife warmed under hot running water and wiped dry between cuts for pristine presentation.'
    },
    {
      id: 'guide-pastries-cream',
      title: 'Cream & Custard Pastries',
      temp: 'Strict Refrigeration (2°C–4°C)',
      container: 'Sturdy bakery pastry box with individual compartment inserts',
      recommended: 'Consume within 24 hours (Day of purchase recommended)',
      dos: [
        'Refrigerate immediately after bringing home.',
        'Eat as fresh as possible: custard and fruit tarts are at their peak on day of purchase.',
        'Keep box flat and upright during all transfers.'
      ],
      donts: [
        'Do not leave at room temperature for longer than 60 minutes.',
        'Do not stack heavy items on top of pastry box.'
      ],
      revivalTip: 'Delicate pastry dough (choux, mille-feuille) softens when in contact with moist cream. Best enjoyed fresh from the bakery case!'
    },
    {
      id: 'guide-croissants',
      title: 'Croissants & Viennoiserie',
      temp: 'Room Temperature (18°C–21°C)',
      container: 'Breathable unbleached bakery paper bag',
      recommended: 'Optimal within 12 hours of bake; acceptable next morning',
      dos: [
        'Keep in paper bag at room temperature until serving.',
        'To enjoy next morning, crisp in preheated 175°C oven or air fryer for 3–4 minutes.'
      ],
      donts: [
        'Never put in microwave! Microwaving melts butter pockets into soggy dough.',
        'Do not refrigerate, which causes butter in pastry layers to stiffen and absorb fridge odors.'
      ],
      revivalTip: 'Day-old croissants make world-class French toast or twice-baked almond croissants! Slice in half, dip in vanilla milk syrup, fill with almond cream, and bake.'
    },
    {
      id: 'guide-cookies',
      title: 'Cookies & Sablés',
      temp: 'Cool, Dry Pantry (16°C–20°C)',
      container: 'Airtight metal biscuit tin, sealed glass jar, or zip-lock pouch',
      recommended: 'Best enjoyed within 14 to 21 days',
      dos: [
        'Store in airtight container with parchment paper between layers.',
        'Keep away from strong spices and heat sources.',
        'Add a small food-safe silica gel packet or food-grade parchment to retain crunch.'
      ],
      donts: [
        'Do not store crisp cookies in same container as soft moist breads, as cookies absorb moisture and lose snap.',
        'Do not refrigerate dry biscuits.'
      ],
      revivalTip: 'For gooey chewy cookies (like chocolate chunk), warm in 160°C oven for 90 seconds to remelt chocolate puddles.'
    }
  ];

  // 5. Packaging & Food Safety Dataset
  const packagingData = [
    {
      title: 'Reinforced Thermal Cake Box',
      category: 'Celebration Cakes',
      materials: 'Heavy-gauge corrugated virgin kraft board with greaseproof food-contact baseboard.',
      foodSafetyNotice: 'Complies with US FDA and EU food contact regulations for direct bakery contact without leaching.',
      features: [
        'Interlocking fold design with sturdy carry handles',
        'Grease-resistant laminated baseboard',
        'Pop-up plant cellulose window',
        'Thermal insulating base for short commutes'
      ],
      advice: [
        'Always support cake box from underneath base with both palms.',
        'Place on flat vehicle floorboard (never tilted car seats).'
      ],
      imageUrl: 'assets/images/cake-box.jpg'
    },
    {
      title: 'Micro-Perforated Kraft Bread Bags',
      category: 'Artisan Breads',
      materials: '100% unbleached European kraft paper with micro-perforated breathable window.',
      foodSafetyNotice: 'Chlorine-free, unbleached, soy-ink printed food grade paper safe for warm loaves.',
      features: [
        'Micro-perforations let steam escape so crust stays blistered',
        'Natural paper prevents condensation mold',
        '100% curbside recyclable and chlorine-free'
      ],
      advice: [
        'Fold top down twice to seal in freshness after slicing.',
        'Keep away from humid kitchen counters next to simmering pots.'
      ],
      imageUrl: 'assets/images/artisan-bread-pastry.jpg'
    },
    {
      title: 'Rigid Compostable Pastry Trays',
      category: 'Pastries & Viennoiserie',
      materials: 'Bagasse (reclaimed sugarcane pulp fiber) with clear recyclable protective lid.',
      foodSafetyNotice: 'PFAS-free, certified food-contact compliant, heat-tolerant up to 80°C.',
      features: [
        'Individual molded wells to prevent delicate pastries from colliding',
        'Raised lid clearance protects tall buttercream rosettes',
        'Moisture-resistant inner lining'
      ],
      advice: [
        'Keep horizontal at all times during transport.',
        'Open by pressing side tabs gently rather than pulling from center.'
      ],
      imageUrl: 'assets/images/butter-croissant.jpg'
    },
    {
      title: 'Customer Safe Transportation Protocol',
      category: 'Logistics Guidance',
      materials: 'Reinforced non-slip carrier sleeves and reusable insulated bakery totes.',
      foodSafetyNotice: 'Handled under certified clean-pack protocol with clean gloves and food safety tongs.',
      features: [
        'Non-slip base mat provided for trunk or floorboard',
        'Freezer-grade chill gel packs available upon request for trips over 30 mins',
        'Tamper-evident bakery seal on all orders'
      ],
      advice: [
        'Turn on car AC 5 minutes prior to loading delicate cream cakes.',
        'Avoid sudden braking; drive with care when transporting tall celebration tiers.'
      ],
      imageUrl: 'assets/images/packaging-transport.jpg'
    }
  ];

  // 6. 12 Monthly Festival Offers Dataset
  const monthlyOffersData = [
    {
      month: 1,
      monthName: 'January',
      festivalName: 'New Year & Epiphany Galette Specials',
      title: 'Sweet Crumbs New Year Celebrations',
      tagline: 'Ring in the New Year with authentic Galette des Rois & brioche crown collections',
      description: 'Celebrate the dawn of the year with our almond frangipane Galette des Rois containing porcelain feves and golden crowns, paired with festive morning brioche baskets.',
      discountBadge: '15% Off New Year Bundles',
      couponCode: 'NEWYEAR15',
      startDate: '2026-01-01',
      endDate: '2026-01-20',
      applicableProducts: ['Galette des Rois', 'Festive Brioche Basket', 'New Year Truffle Cake'],
      terms: ['Valid on orders above $35', 'Advance pre-order required 48 hours in advance'],
      imageUrl: 'assets/images/chocolate-silk-cake.jpg'
    },
    {
      month: 2,
      monthName: 'February',
      festivalName: "Valentine's Day Romance & Strawberry Delights",
      title: "Valentine's Sweetheart Patisserie",
      tagline: 'Heart-shaped strawberry mousse gateaux, rose macarons & chocolate silk truffles',
      description: 'Romantic handcrafted gateaux layered with organic strawberry coulis, French rose water infused macarons, and Valrhona ruby chocolate pastries.',
      discountBadge: 'Free Box of 6 Macarons with 1kg Cake',
      couponCode: 'VALENTINE20',
      startDate: '2026-02-05',
      endDate: '2026-02-18',
      applicableProducts: ['Heart Strawberry Chiffon', 'Ruby Macaron Box', 'Dark Chocolate Truffle Tart'],
      terms: ['Valid for orders collected Feb 10–16', 'One voucher per customer'],
      imageUrl: 'assets/images/strawberry-chiffon.jpg'
    },
    {
      month: 3,
      monthName: 'March',
      festivalName: "International Women's Day Specials",
      title: 'High-Tea & Floral Confections',
      tagline: 'Delicate lavender blueberry tarts, Earl Grey financiers & rosewater madeleines',
      description: 'Honoring inspiring women with bespoke pastel dessert hampers, floral pastry collections, and artisanal afternoon tea tier boxes.',
      discountBadge: '15% Off High Tea Hampers',
      couponCode: 'WOMENSDAY15',
      startDate: '2026-03-01',
      endDate: '2026-03-12',
      applicableProducts: ['High Tea Pastry Box', 'Lavender Tart', 'Earl Grey Financier Set'],
      terms: ['Valid on High Tea collections', 'Order 24h prior'],
      imageUrl: 'assets/images/raspberry-pistachio-tart.jpg'
    },
    {
      month: 4,
      monthName: 'April',
      festivalName: 'Easter Spring Celebration',
      title: 'Easter Hot Cross Buns & Chocolate Garden',
      tagline: 'Hand-spiced orange zest hot cross buns, Simnel marzipan cake & artisan chocolate eggs',
      description: 'Slow-fermented hot cross buns glazed with spiced honey, alongside traditional 11-ball Simnel cakes and handcrafted bean-to-bar chocolate nests.',
      discountBadge: 'Buy 6 Hot Cross Buns, Get 2 Free',
      couponCode: 'EASTER2026',
      startDate: '2026-04-01',
      endDate: '2026-04-20',
      applicableProducts: ['Spiced Hot Cross Buns', 'Simnel Almond Cake', 'Handcrafted Chocolate Egg'],
      terms: ['Valid during Easter holiday period'],
      imageUrl: 'assets/images/artisan-bread-pastry.jpg'
    },
    {
      month: 5,
      monthName: 'May',
      festivalName: "Mother's Day Special Collection",
      title: "Mother's Day Fresh Berry & Rose Cakes",
      tagline: 'Elegant strawberry shortcakes, vanilla bean tartlets & edible flower cakes',
      description: 'Featherlight Japanese sponge cakes decorated with sweet seasonal strawberries and fragrant edible organic blossom petals.',
      discountBadge: 'Free Custom Message Plaque',
      couponCode: 'MOMSDAY15',
      startDate: '2026-05-01',
      endDate: '2026-05-15',
      applicableProducts: ['Japanese Strawberry Chiffon', 'Vanilla Berry Tartlet Box', 'Rose Petal Cupcakes'],
      terms: ['Includes personalized golden chocolate message plaque', 'Pre-orders recommended by May 8'],
      imageUrl: 'assets/images/vanilla-raspberry-cupcakes.jpg'
    },
    {
      month: 6,
      monthName: 'June',
      festivalName: "Father's Day Gourmet Coffee & Caramel",
      title: "Father's Day Artisan Coffee & Walnut Torte",
      tagline: 'Espresso-soaked sponge, salted caramel crunch & smoky bourbon chocolate cakes',
      description: 'Bold dessert profiles for Dad: single-origin Ethiopian espresso infused cakes, roasted walnut tortes, and dark chocolate whiskey truffles.',
      discountBadge: '12% Off Coffee & Caramel Cakes',
      couponCode: 'DADSDAY12',
      startDate: '2026-06-01',
      endDate: '2026-06-21',
      applicableProducts: ['Espresso Walnut Torte', 'Salted Caramel Tart', 'Belgian Dark Chocolate Silk Cake'],
      terms: ['Valid on specified coffee and caramel dessert orders above $30'],
      imageUrl: 'assets/images/chocolate-silk-cake.jpg'
    },
    {
      month: 7,
      monthName: 'July',
      festivalName: 'Summer Berry & Peach Festival',
      title: 'Midsummer Fresh Fruit & Danish Fest',
      tagline: 'Local berry galettes, poached peach danishes & lemon curd meringue tarts',
      description: 'Celebrating the peak of summer harvest with freshly picked farm berries, sun-ripened stone fruits, and golden buttery Danish pastries.',
      discountBadge: '15% Off Any 4 Fruit Pastries',
      couponCode: 'SUMMERBERRY',
      startDate: '2026-07-01',
      endDate: '2026-07-31',
      applicableProducts: ['Spiced Caramelized Peach Danish', 'Fresh Raspberry & Bronte Pistachio Tart', 'Lemon Meringue Tart'],
      terms: ['Applies automatically to pastry boxes containing 4 or more fruit items'],
      imageUrl: 'assets/images/raspberry-pistachio-tart.jpg'
    },
    {
      month: 8,
      monthName: 'August',
      festivalName: 'Independence Day Tri-Color & Saffron Delights',
      title: 'Independence Festival Specials',
      tagline: 'Saffron pistachio entremets, tri-color berry parfaits & cardamom tea cakes',
      description: 'Festive commemorative collection blending royal saffron, rich pistachios, and fresh cream layered confections.',
      discountBadge: 'Flat $5 Off on Festive Boxes',
      couponCode: 'FREEDOM5',
      startDate: '2026-08-01',
      endDate: '2026-08-20',
      applicableProducts: ['Saffron Pistachio Cake', 'Tri-Color Fruit Parfait', 'Cardamom Tea Cake'],
      terms: ['Valid on festive celebration hampers above $35'],
      imageUrl: 'assets/images/paris-brest.jpg'
    },
    {
      month: 9,
      monthName: 'September',
      festivalName: 'Onam Harvest & Coconut Cardamom Collection',
      title: 'Onam Harvest Pastry Symphony',
      tagline: 'Jaggery coconut brioche, cardamom payasam tarts & tender banana bread',
      description: 'A tribute to the vibrant harvest festival: caramel jaggery infusions, roasted coconut flakes, and delicate cardamom spiced pastries.',
      discountBadge: '15% Off Festive Harvest Hampers',
      couponCode: 'ONAMHARVEST',
      startDate: '2026-09-01',
      endDate: '2026-09-20',
      applicableProducts: ['Coconut Jaggery Brioche', 'Cardamom Payasam Tart', 'Harvest Spiced Bread'],
      terms: ['Special harvest festive box orders only'],
      imageUrl: 'assets/images/peach-danish.jpg'
    },
    {
      month: 10,
      monthName: 'October',
      festivalName: 'Diwali Lights & Fusion Bakes',
      title: 'Diwali Grand Patisserie Hamper',
      tagline: 'Motichoor cheesecake tartlets, rose pistachio financiers & gold-dusted chocolate bakes',
      description: 'Celebrate the Festival of Lights with our famous artisan fusion pastries. Perfectly balanced sweet delicacies packaged in royal gold-embossed gift boxes.',
      discountBadge: '20% Off Festive Gift Hampers',
      couponCode: 'DIWALI20',
      startDate: '2026-10-05',
      endDate: '2026-10-31',
      applicableProducts: ['Diwali Royal Hamper', 'Rose Pistachio Financier Box', 'Gold Leaf Dark Truffles'],
      terms: ['Valid on Diwali gift collections', 'Bulk corporate orders available with advance booking'],
      imageUrl: 'assets/images/chocolate-silk-cake.jpg'
    },
    {
      month: 11,
      monthName: 'November',
      festivalName: "Children's Day Cupcake & Donut Carnival",
      title: "Children's Day Sweet Fun Carnival",
      tagline: 'Rainbow sprinkle cupcakes, molten cocoa donuts & animal character butter sablés',
      description: 'A celebration dedicated to childhood joy! Playful animal face butter cookies, fluffy rainbow cupcakes filled with chocolate crunch, and mini artisan donuts.',
      discountBadge: 'Buy 6 Cupcakes, Get 2 Free',
      couponCode: 'KIDSJOY15',
      startDate: '2026-11-01',
      endDate: '2026-11-20',
      applicableProducts: ['Madagascar Vanilla & Raspberry Buttercream Cupcakes', 'Animal Butter Sablé Tin', 'Carnival Donut Box'],
      terms: ['Valid for all children celebration boxes', 'Great for birthday parties'],
      imageUrl: 'assets/images/vanilla-raspberry-cupcakes.jpg'
    },
    {
      month: 12,
      monthName: 'December',
      festivalName: 'Christmas & Winter Holiday Wonders',
      title: 'Christmas Aged Plum Cakes & Yule Logs',
      tagline: 'Traditional 12-month rum-soaked fruit plum cakes, chocolate hazelnut Bûche de Noël & marzipan stollen',
      description: 'Our most cherished holiday tradition. Dried winter fruits soaked in dark rum and spices for 12 months, baked into rich dense plum cakes, accompanied by French Bûche de Noël.',
      discountBadge: 'Early Bird 15% Off Holiday Cakes',
      couponCode: 'XMASHEARTH',
      startDate: '2026-12-01',
      endDate: '2026-12-31',
      applicableProducts: ['Aged Rum Plum Cake', 'Valrhona Chocolate Bûche de Noël', 'Dresden Butter Stollen'],
      terms: ['Pre-order required by Dec 18 for guaranteed Christmas Eve pickup'],
      imageUrl: 'assets/images/chocolate-silk-cake.jpg'
    }
  ];

  // 7. Active Coupons Dataset (Display Cards + Full Validation Rules)
  const couponsData = [
    {
      code: 'WELCOME10',
      description: '10% off your first bakery order or tasting box.',
      discountBadge: '10% OFF',
      discountType: 'percentage',
      discountValue: 10,
      minOrderAmount: 20,
      validUntil: '2026-12-31',
      terms: ['Applies to entire online enquiry basket', 'Minimum order value $20.00', 'One use per customer']
    },
    {
      code: 'BAKERY20',
      description: 'Save 20% on any custom celebration cake order over $50.',
      discountBadge: '20% OFF',
      discountType: 'percentage',
      discountValue: 20,
      minOrderAmount: 50,
      validUntil: '2026-12-31',
      terms: ['Applies to custom cake bookings', 'Minimum order value $50.00', 'Requires 24h advance reservation']
    },
    {
      code: 'FESTIVE15',
      description: 'Seasonal promotion: 15% off festive pastry hampers and holiday bakes.',
      discountBadge: '15% OFF',
      discountType: 'percentage',
      discountValue: 15,
      minOrderAmount: 35,
      validUntil: '2026-12-31',
      terms: ['Applies to monthly promotional selections', 'Minimum spend $35.00']
    },
    {
      code: 'CRUMBS5',
      description: 'Flat $5.00 off any morning bread and pastry bundle over $25.',
      discountBadge: '$5.00 OFF',
      discountType: 'fixed',
      discountValue: 5,
      minOrderAmount: 25,
      validUntil: '2026-12-31',
      terms: ['Valid for morning pickup orders', 'Minimum spend $25.00']
    }
  ];

  // Complete Coupon Lookup Registry (includes monthly festival promo codes)
  const validCouponRules = {
    WELCOME10: { discountType: 'percentage', value: 10, minOrder: 20, desc: '10% off your first bakery order' },
    BAKERY20: { discountType: 'percentage', value: 20, minOrder: 50, desc: '20% off celebration cakes' },
    FESTIVE15: { discountType: 'percentage', value: 15, minOrder: 35, desc: '15% off festive hampers' },
    CRUMBS5: { discountType: 'fixed', value: 5, minOrder: 25, desc: '$5 flat discount on orders over $25' },
    HEARTH5: { discountType: 'fixed', value: 5, minOrder: 25, desc: '$5 flat discount on orders over $25' },
    NEWYEAR15: { discountType: 'percentage', value: 15, minOrder: 35, desc: '15% New Year Special' },
    VALENTINE20: { discountType: 'percentage', value: 20, minOrder: 40, desc: '20% Valentine Special' },
    WOMENSDAY15: { discountType: 'percentage', value: 15, minOrder: 30, desc: "15% Women's Day High-Tea Special" },
    EASTER2026: { discountType: 'percentage', value: 18, minOrder: 30, desc: '18% Easter Special' },
    MOMSDAY15: { discountType: 'percentage', value: 15, minOrder: 35, desc: "15% Mother's Day Cake Special" },
    DADSDAY12: { discountType: 'percentage', value: 12, minOrder: 30, desc: "12% Father's Day Gourmet Special" },
    SUMMERBERRY: { discountType: 'percentage', value: 15, minOrder: 25, desc: '15% Summer Berry & Peach Special' },
    FREEDOM5: { discountType: 'fixed', value: 5, minOrder: 35, desc: '$5 off Independence Festive Boxes' },
    ONAMHARVEST: { discountType: 'percentage', value: 15, minOrder: 35, desc: '15% Onam Harvest Collection Special' },
    DIWALI20: { discountType: 'percentage', value: 20, minOrder: 50, desc: '20% Diwali Festive Hamper' },
    KIDSJOY15: { discountType: 'percentage', value: 15, minOrder: 25, desc: "15% Children's Day Carnival" },
    XMASHEARTH: { discountType: 'percentage', value: 15, minOrder: 40, desc: '15% Christmas Special' }
  };

  // Client-Side Enquiries Persistence (localStorage + in-memory fallback)
  let memoryEnquiriesFallback = [];

  function loadStoredEnquiries() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.enquiries);
      if (!raw) return memoryEnquiriesFallback;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : memoryEnquiriesFallback;
    } catch (_err) {
      return memoryEnquiriesFallback;
    }
  }

  function saveStoredEnquiry(enquiry) {
    const existing = loadStoredEnquiries();
    const updated = [enquiry, ...existing];
    memoryEnquiriesFallback = updated;
    try {
      localStorage.setItem(STORAGE_KEYS.enquiries, JSON.stringify(updated));
    } catch (_err) {
      // Fall back to in-memory list when storage quota or privacy mode blocks localStorage
    }
    return updated;
  }

  function validateCouponCode(rawCode, orderSubtotal) {
    const cleanCode = String(rawCode || '').trim().toUpperCase();
    if (!cleanCode) {
      return { valid: false, message: 'Please provide a coupon code.' };
    }

    const coupon = validCouponRules[cleanCode];
    if (!coupon) {
      return {
        valid: false,
        code: cleanCode,
        message: `Coupon code "${cleanCode}" is not recognized or has expired.`
      };
    }

    const subtotal = Number(orderSubtotal) || 0;
    if (subtotal > 0 && subtotal < coupon.minOrder) {
      return {
        valid: false,
        code: cleanCode,
        message: `Coupon "${cleanCode}" requires a minimum order value of $${coupon.minOrder.toFixed(2)}. Current subtotal is $${subtotal.toFixed(2)}.`
      };
    }

    const discountAmount =
      coupon.discountType === 'percentage'
        ? subtotal > 0
          ? (subtotal * coupon.value) / 100
          : 0
        : coupon.value;

    return {
      valid: true,
      code: cleanCode,
      discountType: coupon.discountType,
      discountValue: coupon.value,
      discountAmount: Math.round(discountAmount * 100) / 100,
      description: coupon.desc,
      message: `Coupon code "${cleanCode}" successfully applied!`
    };
  }

  // Active UI State
  let currentPastryFilter = 'all';
  let currentCatalogCategory = 'all';
  let currentCatalogSearch = '';
  let currentCatalogSort = 'featured';
  let currentFilterEggless = false;
  let currentFilterVegetarian = false;
  let currentFreshnessSearch = '';
  let currentFreshnessType = 'all';
  let currentSelectedMonth = 11; // November (matches default active calendar spotlight)
  let currentSelectedStorageTab = 'guide-bread';
  const selectedSizesMap = {};

  // Helper: Open WhatsApp
  function openWhatsAppChat(customMessage = '') {
    const text = encodeURIComponent(
      customMessage || `Hello ${bakeryConfig.name}! I would like to inquire about your fresh bakery products.`
    );
    window.open(`https://wa.me/${bakeryConfig.whatsappNumber}?text=${text}`, '_blank', 'noopener,noreferrer');
  }

  // ----------------------------------------------------
  // Rendering Functions
  // ----------------------------------------------------

  // 1. Render Best Sellers
  function renderBestSellers() {
    const container = document.getElementById('best-sellers-grid');
    if (!container) return;

    const bestSellers = productsData.filter(p => p.isBestSeller);
    container.innerHTML = bestSellers
      .map(product => {
        const selectedSize = selectedSizesMap[product.id] || product.defaultSize;
        const statusLabel = product.isAvailable ? product.availabilityStatus : 'Out of Stock';

        return `
          <div class="bg-white rounded-2xl border border-[#ebdcd0] shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group">
            <div class="relative aspect-4/3 overflow-hidden bg-[#f0e7dd]">
              <img src="${escapeHtml(product.imageUrl)}" alt="${escapeHtml(product.name)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div class="absolute top-3 left-3 bg-[#8c3d19] text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs flex items-center gap-1">
                <span>★</span><span>Best Seller</span>
              </div>
              <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#423126] text-[11px] font-medium px-2 py-0.5 rounded-md capitalize shadow-xs">
                ${escapeHtml(product.category)}
              </div>
              <div class="absolute bottom-2 left-2 right-2 bg-black/65 backdrop-blur-xs text-white text-[10px] px-2 py-1 rounded flex items-center gap-1.5 truncate">
                <span>🕒</span><span class="truncate">${escapeHtml(product.batchSchedule)}</span>
              </div>
            </div>

            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 class="font-serif text-lg font-bold text-[#261912] hover:text-[#8c3d19] transition-colors cursor-pointer leading-snug line-clamp-2" onclick="window.sweetCrumbs.openProductModal('${escapeHtml(product.id)}')">
                  ${escapeHtml(product.name)}
                </h3>
                <p class="mt-1.5 text-xs text-[#635146] line-clamp-2 leading-relaxed">
                  ${escapeHtml(product.shortDescription)}
                </p>
                <div class="mt-3 flex items-baseline justify-between border-t border-[#f0e4d7] pt-2">
                  <div>
                    <span class="text-lg font-bold text-[#8c3d19]">${escapeHtml(product.formattedPrice)}</span>
                    ${product.isPricePlaceholder ? '<span class="ml-1 text-[10px] text-[#8e7666] italic">(sample price)</span>' : ''}
                  </div>
                  <span class="text-[11px] text-[#426b38] font-medium bg-[#eef7ed] px-2 py-0.5 rounded">
                    ${escapeHtml(statusLabel)}
                  </span>
                </div>

                ${
                  product.sizeOptions && product.sizeOptions.length > 1
                    ? `
                  <div class="mt-3">
                    <label class="text-[11px] font-semibold text-[#4f3e33] block mb-1">Select Size / Portion:</label>
                    <select class="w-full text-xs bg-[#faf7f2] border border-[#d9c8b8] text-[#261912] rounded-lg px-2.5 py-1.5 focus:outline-none" onchange="window.sweetCrumbs.updateProductSize('${escapeHtml(product.id)}', this.value)">
                      ${product.sizeOptions
                        .map(
                          opt =>
                            `<option value="${escapeHtml(opt)}" ${opt === selectedSize ? 'selected' : ''}>${escapeHtml(opt)}</option>`
                        )
                        .join('')}
                    </select>
                  </div>
                `
                    : ''
                }
              </div>

              <div class="mt-5 pt-3 border-t border-[#f0e4d7] flex items-center gap-2">
                <button onclick="window.sweetCrumbs.prefillEnquiry('${escapeHtml(product.id)}')" class="flex-1 py-2 px-3 text-xs font-semibold rounded-lg text-white bg-[#8c3d19] hover:bg-[#702e11] transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                  <span>✨</span><span>Enquire Now</span>
                </button>
                <button onclick="window.sweetCrumbs.enquireProductOnWhatsApp('${escapeHtml(product.id)}')" class="p-2 text-xs font-semibold rounded-lg text-[#1e613b] bg-[#e6f4ea] hover:bg-[#d5ebd9] border border-[#a8dab5] transition-colors cursor-pointer" title="WhatsApp Enquiry">
                  💬
                </button>
                <button onclick="window.sweetCrumbs.openProductModal('${escapeHtml(product.id)}')" class="p-2 text-xs font-medium rounded-lg text-[#5a483e] hover:bg-[#f1e6da] border border-[#ded0c2] transition-colors cursor-pointer" title="View Details">
                  ℹ️
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  // 2. Render Special Pastries
  function renderSpecialPastries() {
    const filterContainer = document.getElementById('pastry-filters');
    const grid = document.getElementById('special-pastries-grid');
    if (!filterContainer || !grid) return;

    const pastries = productsData.filter(p => p.category === 'pastries' || p.isSpecialPastry);

    const tabs = [
      { id: 'all', label: 'All Pastries' },
      { id: 'chocolate', label: 'Chocolate' },
      { id: 'cream', label: 'Cream & Custard' },
      { id: 'fruit', label: 'Fresh Fruit Tarts' },
      { id: 'croissants', label: 'Croissants' },
      { id: 'danish', label: 'Danish Pastries' },
      { id: 'seasonal', label: 'Seasonal Specials' }
    ];

    filterContainer.innerHTML = tabs
      .map(tab => {
        const count = tab.id === 'all' ? pastries.length : pastries.filter(p => p.subcategory === tab.id).length;
        const isActive = currentPastryFilter === tab.id;
        return `
          <button onclick="window.sweetCrumbs.setPastryFilter('${tab.id}')" class="px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
            isActive ? 'bg-[#8c3d19] text-white shadow-xs' : 'text-[#4e3d33] hover:text-[#261912] hover:bg-[#dfcdbe]'
          }">
            <span>${escapeHtml(tab.label)}</span>
            <span class="ml-1 text-[10px] py-0.2 px-1.5 rounded-full ${
              isActive ? 'bg-white/20 text-white' : 'bg-[#dfcdbe] text-[#554338]'
            }">${count}</span>
          </button>
        `;
      })
      .join('');

    const filtered =
      currentPastryFilter === 'all' ? pastries : pastries.filter(p => p.subcategory === currentPastryFilter);

    grid.innerHTML = filtered
      .map(pastry => {
        const statusLabel = pastry.isAvailable ? pastry.availabilityStatus : 'Out of Stock';
        return `
          <div class="bg-white rounded-2xl border border-[#ebdcd0] shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group">
            <div class="relative aspect-16/10 overflow-hidden bg-[#f0e7dd]">
              <img src="${escapeHtml(pastry.imageUrl)}" alt="${escapeHtml(pastry.name)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              ${
                pastry.subcategory
                  ? `<div class="absolute top-3 left-3 bg-[#261912]/80 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">${escapeHtml(pastry.subcategory)}</div>`
                  : ''
              }
              <div class="absolute top-3 right-3 bg-white/95 text-[#246132] text-[11px] font-semibold px-2 py-0.5 rounded shadow-xs">${escapeHtml(statusLabel)}</div>
            </div>

            <div class="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 class="font-serif text-lg font-bold text-[#261912] hover:text-[#8c3d19] transition-colors cursor-pointer leading-snug" onclick="window.sweetCrumbs.openProductModal('${escapeHtml(pastry.id)}')">
                  ${escapeHtml(pastry.name)}
                </h3>
                <p class="mt-2 text-xs text-[#5e4c41] leading-relaxed line-clamp-2">${escapeHtml(pastry.shortDescription)}</p>
                <div class="mt-3 flex items-baseline justify-between border-t border-[#f0e4d7] pt-2">
                  <div>
                    <span class="text-base font-bold text-[#8c3d19]">${escapeHtml(pastry.formattedPrice)}</span>
                    ${pastry.isPricePlaceholder ? '<span class="ml-1 text-[10px] text-[#8e7666] italic">(sample price)</span>' : ''}
                  </div>
                  <span class="text-[11px] text-[#6e584a] font-medium">${escapeHtml(pastry.batchSchedule.split('·')[0])}</span>
                </div>

                <div class="mt-3 text-[11px] text-[#6b584d] space-y-1 bg-[#faf7f2] p-2.5 rounded-lg border border-[#ebdcd0]">
                  <div><strong class="text-[#3b2d24]">Allergens:</strong> ${
                    pastry.allergens && pastry.allergens.length ? escapeHtml(pastry.allergens.join(', ')) : 'Standard traces'
                  }</div>
                  <div><strong class="text-[#3b2d24]">Freshness:</strong> ${escapeHtml(pastry.shelfLifeDetail)}</div>
                </div>
              </div>

              <div class="mt-5 pt-3 border-t border-[#f0e4d7] flex items-center gap-2">
                <button onclick="window.sweetCrumbs.prefillEnquiry('${escapeHtml(pastry.id)}')" class="flex-1 py-2 px-3 text-xs font-semibold rounded-lg text-white bg-[#8c3d19] hover:bg-[#702e11] transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer">
                  <span>✨</span><span>Enquire Now</span>
                </button>
                <button onclick="window.sweetCrumbs.enquireProductOnWhatsApp('${escapeHtml(pastry.id)}')" class="p-2 text-xs font-semibold rounded-lg text-[#1e613b] bg-[#e6f4ea] hover:bg-[#d5ebd9] border border-[#a8dab5] transition-colors cursor-pointer" title="WhatsApp Enquiry">
                  💬
                </button>
                <button onclick="window.sweetCrumbs.openProductModal('${escapeHtml(pastry.id)}')" class="p-2 text-xs font-medium rounded-lg text-[#5a483e] hover:bg-[#f1e6da] border border-[#ded0c2] transition-colors cursor-pointer" title="View Details">
                  ℹ️
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  // 3. Render Product Catalog (Search & Category Filtering)
  function renderCatalog() {
    const tabsContainer = document.getElementById('catalog-category-tabs');
    const grid = document.getElementById('catalog-grid');
    const countEl = document.getElementById('catalog-results-count');
    const resetBtn = document.getElementById('btn-reset-filters');
    if (!grid) return;

    const categories = [
      { id: 'all', label: 'All Products' },
      { id: 'cakes', label: 'Cakes' },
      { id: 'pastries', label: 'Pastries' },
      { id: 'bread', label: 'Artisan Bread' },
      { id: 'cookies', label: 'Cookies' },
      { id: 'cupcakes', label: 'Cupcakes' }
    ];

    if (tabsContainer) {
      tabsContainer.innerHTML = categories
        .map(cat => {
          const isActive = currentCatalogCategory === cat.id;
          return `
            <button onclick="window.sweetCrumbs.setCatalogCategory('${cat.id}')" class="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              isActive ? 'bg-[#8c3d19] text-white shadow-xs' : 'bg-[#faf7f2] text-[#544338] hover:bg-[#ede0d2] border border-[#ebdcd0]'
            }">
              ${escapeHtml(cat.label)}
            </button>
          `;
        })
        .join('');
    }

    const filtered = productsData.filter(product => {
      const q = currentCatalogSearch.toLowerCase();
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.shortDescription.toLowerCase().includes(q) ||
        product.ingredients.some(ing => ing.toLowerCase().includes(q));

      const matchesCategory = currentCatalogCategory === 'all' || product.category === currentCatalogCategory;
      const matchesEggless = !currentFilterEggless || product.isEggless;
      const matchesVeg = !currentFilterVegetarian || product.isVegetarian;

      return matchesQuery && matchesCategory && matchesEggless && matchesVeg;
    });

    if (currentCatalogSort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentCatalogSort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    if (countEl) {
      countEl.innerHTML = `Showing <strong>${filtered.length}</strong> ${filtered.length === 1 ? 'item' : 'items'}`;
    }

    const hasActiveFilters =
      currentCatalogSearch || currentCatalogCategory !== 'all' || currentFilterEggless || currentFilterVegetarian;
    if (resetBtn) {
      resetBtn.classList.toggle('hidden', !hasActiveFilters);
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-16 bg-white rounded-2xl border border-[#ebdcd0] p-8 max-w-lg mx-auto">
          <h3 class="font-serif text-xl font-bold text-[#261912] mb-2">No bakery items found</h3>
          <p class="text-xs text-[#6e584a] mb-6">We couldn’t find any items matching your active search terms or dietary filters.</p>
          <button onclick="window.sweetCrumbs.resetCatalogFilters()" class="px-4 py-2 text-xs font-semibold rounded-lg text-[#8c3d19] bg-[#f5ede2] hover:bg-[#ebdcd0] cursor-pointer">
            Clear Filters
          </button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered
      .map(product => {
        const statusLabel = product.isAvailable ? product.availabilityStatus : 'Out of Stock';
        return `
          <div class="bg-white rounded-2xl border border-[#ebdcd0] shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group">
            <div class="relative aspect-4/3 overflow-hidden bg-[#f0e7dd]">
              <img src="${escapeHtml(product.imageUrl)}" alt="${escapeHtml(product.name)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              <div class="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-[#3b2d24] text-[10px] font-semibold px-2 py-0.5 rounded shadow-xs capitalize">
                ${escapeHtml(product.category)}
              </div>
              ${
                product.isEggless
                  ? `<div class="absolute top-2.5 left-2.5 bg-[#eef6ec] text-[#2c6b32] text-[10px] font-bold px-2 py-0.5 rounded border border-[#c6e9cc]">Eggless</div>`
                  : ''
              }
            </div>

            <div class="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 class="font-serif text-base font-bold text-[#261912] hover:text-[#8c3d19] transition-colors cursor-pointer leading-snug line-clamp-1" onclick="window.sweetCrumbs.openProductModal('${escapeHtml(product.id)}')">
                  ${escapeHtml(product.name)}
                </h3>
                <p class="mt-1 text-xs text-[#635146] line-clamp-2 leading-relaxed">${escapeHtml(product.shortDescription)}</p>
                <div class="mt-3 flex items-baseline justify-between border-t border-[#f0e4d7] pt-2">
                  <span class="text-base font-bold text-[#8c3d19]">${escapeHtml(product.formattedPrice)}</span>
                  <span class="text-[10px] text-[#426b38] font-medium bg-[#eef7ed] px-1.5 py-0.5 rounded">${escapeHtml(statusLabel)}</span>
                </div>
              </div>

              <div class="mt-4 pt-3 border-t border-[#f0e4d7] flex items-center gap-1.5">
                <button onclick="window.sweetCrumbs.prefillEnquiry('${escapeHtml(product.id)}')" class="flex-1 py-1.5 px-2 text-xs font-semibold rounded-lg text-white bg-[#8c3d19] hover:bg-[#702e11] transition-colors flex items-center justify-center gap-1 cursor-pointer">
                  <span>✨</span><span>Enquire</span>
                </button>
                <button onclick="window.sweetCrumbs.enquireProductOnWhatsApp('${escapeHtml(product.id)}')" class="p-1.5 rounded-lg text-[#1e613b] bg-[#e6f4ea] hover:bg-[#d5ebd9] border border-[#a8dab5] transition-colors cursor-pointer" title="Enquire on WhatsApp">
                  💬
                </button>
                <button onclick="window.sweetCrumbs.openProductModal('${escapeHtml(product.id)}')" class="p-1.5 rounded-lg text-[#5a483e] hover:bg-[#f1e6da] border border-[#ded0c2] transition-colors cursor-pointer" title="Details">
                  ℹ️
                </button>
              </div>
            </div>
          </div>
        `;
      })
      .join('');
  }

  // 4. Render Recipes Section
  function renderRecipes() {
    const container = document.getElementById('recipes-grid');
    if (!container) return;

    container.innerHTML = recipesData
      .map(
        recipe => `
      <div class="bg-white rounded-2xl border border-[#ebdcd0] shadow-xs hover:shadow-md transition-all flex flex-col overflow-hidden group">
        <div class="relative aspect-16/10 overflow-hidden bg-[#f0e7dd]">
          <img src="${escapeHtml(recipe.imageUrl)}" alt="${escapeHtml(recipe.title)}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          <div class="absolute top-3 left-3 bg-[#261912]/80 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md">
            ${escapeHtml(recipe.category)}
          </div>
          <div class="absolute top-3 right-3 bg-white/95 text-[#8c3d19] text-[11px] font-bold px-2 py-0.5 rounded shadow-xs">
            ${escapeHtml(recipe.difficulty)}
          </div>
        </div>

        <div class="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 class="font-serif text-xl font-bold text-[#261912] leading-snug">${escapeHtml(recipe.title)}</h3>
            <p class="mt-1 text-xs text-[#705a4d] italic">${escapeHtml(recipe.subtitle)}</p>
            <p class="mt-3 text-xs text-[#544338] line-clamp-2 leading-relaxed">${escapeHtml(recipe.story)}</p>

            <div class="mt-4 grid grid-cols-2 gap-2 text-[11px] text-[#544338] bg-[#fcf9f5] p-3 rounded-lg border border-[#ebdcd0]">
              <div>🕒 Prep: ${escapeHtml(recipe.prepTime.split('(')[0])}</div>
              <div>🥖 Yield: ${escapeHtml(recipe.yieldInfo.split('(')[0])}</div>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-[#ebdcd0]">
            <button onclick="window.sweetCrumbs.openRecipeModal('${escapeHtml(recipe.id)}')" class="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-[#8c3d19] bg-[#faf2ea] hover:bg-[#8c3d19] hover:text-white border border-[#debfa5] transition-all flex items-center justify-center gap-2 cursor-pointer">
              <span>View Step-by-Step Recipe</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    `
      )
      .join('');
  }

  // 5. Render Storage & Care Guide
  function renderStorageGuide() {
    const tabsContainer = document.getElementById('storage-tabs');
    const contentCard = document.getElementById('storage-content-card');
    if (!tabsContainer || !contentCard) return;

    tabsContainer.innerHTML = storageGuidesData
      .map(guide => {
        const isActive = currentSelectedStorageTab === guide.id;
        return `
          <button onclick="window.sweetCrumbs.setStorageTab('${guide.id}')" class="px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
            isActive ? 'bg-[#8c3d19] text-white shadow-xs' : 'text-[#4e3d33] hover:text-[#261912] hover:bg-[#dfcdbe]'
          }">
            ${escapeHtml(guide.title)}
          </button>
        `;
      })
      .join('');

    const activeGuide = storageGuidesData.find(g => g.id === currentSelectedStorageTab) || storageGuidesData[0];

    contentCard.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-5 space-y-4">
          <div class="border-b border-[#f0e4d7] pb-4">
            <span class="text-[11px] font-bold uppercase tracking-wider text-[#8c3d19]">Category Specifications</span>
            <h3 class="font-serif text-2xl font-bold text-[#261912] mt-1">${escapeHtml(activeGuide.title)}</h3>
          </div>

          <div class="space-y-3 text-xs">
            <div class="bg-[#faf7f2] p-3.5 rounded-xl border border-[#ebdcd0]">
              <strong class="block text-[#261912]">🌡️ Temperature &amp; Environment</strong>
              <span class="text-[#59463b]">${escapeHtml(activeGuide.temp)}</span>
            </div>
            <div class="bg-[#faf7f2] p-3.5 rounded-xl border border-[#ebdcd0]">
              <strong class="block text-[#261912]">📦 Recommended Container</strong>
              <span class="text-[#59463b]">${escapeHtml(activeGuide.container)}</span>
            </div>
            <div class="bg-[#faf7f2] p-3.5 rounded-xl border border-[#ebdcd0]">
              <strong class="block text-[#261912]">🕒 Ideal Consumption Window</strong>
              <span class="text-[#59463b]">${escapeHtml(activeGuide.recommended)}</span>
            </div>
          </div>

          <div class="bg-[#fff9f2] p-4 rounded-xl border border-[#eed7be] text-xs">
            <strong class="text-[#8c3d19] block mb-1">🔥 Baker’s Reheating &amp; Refresh Secret</strong>
            <p class="text-[#694d37] leading-relaxed">${escapeHtml(activeGuide.revivalTip)}</p>
          </div>
        </div>

        <div class="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-[#266336] mb-3">✓ Recommended Storage Best Practices</h4>
            <ul class="space-y-2.5">
              ${activeGuide.dos
                .map(
                  r => `
                <li class="text-xs text-[#45372e] bg-[#f2f9f3] p-3 rounded-lg border border-[#cbe6d1] flex items-start gap-2">
                  <span class="text-[#266336] font-bold">•</span><span>${escapeHtml(r)}</span>
                </li>
              `
                )
                .join('')}
            </ul>
          </div>

          <div>
            <h4 class="text-xs font-bold uppercase tracking-wider text-[#9e2a2a] mb-3">✕ Common Storage Mistakes to Avoid</h4>
            <ul class="space-y-2.5">
              ${activeGuide.donts
                .map(
                  r => `
                <li class="text-xs text-[#45372e] bg-[#fdf2f2] p-3 rounded-lg border border-[#f5c6c6] flex items-start gap-2">
                  <span class="text-[#9e2a2a] font-bold">•</span><span>${escapeHtml(r)}</span>
                </li>
              `
                )
                .join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  // 6. Render Packaging & Safety
  function renderPackaging() {
    const container = document.getElementById('packaging-grid');
    if (!container) return;

    container.innerHTML = packagingData
      .map(
        item => `
      <div class="bg-white rounded-2xl border border-[#ebdcd0] shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col md:flex-row">
        <div class="md:w-5/12 relative aspect-4/3 md:aspect-auto bg-[#f0e7dd]">
          <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.title)}" class="w-full h-full object-cover" loading="lazy" />
          <div class="absolute top-3 left-3 bg-[#261912]/80 backdrop-blur-xs text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded">${escapeHtml(item.category)}</div>
        </div>
        <div class="md:w-7/12 p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 class="font-serif text-xl font-bold text-[#261912]">${escapeHtml(item.title)}</h3>
            <p class="mt-2 text-xs text-[#635146]"><strong class="text-[#261912]">Materials:</strong> ${escapeHtml(item.materials)}</p>
            <ul class="mt-3 space-y-1 text-xs text-[#524137]">
              ${item.features
                .map(f => `<li class="flex items-start gap-1.5"><span class="text-[#2b723d]">✓</span><span>${escapeHtml(f)}</span></li>`)
                .join('')}
            </ul>
          </div>
          <div class="pt-3 border-t border-[#f0e4d7] bg-[#fdfbf8] p-3 rounded-xl border border-[#ebdcd0] text-[11px] text-[#635044]">
            <strong class="text-[#8c3d19] block mb-1">Safe Handling Advice:</strong>
            ${item.advice.map(a => `<div>• ${escapeHtml(a)}</div>`).join('')}
          </div>
        </div>
      </div>
    `
      )
      .join('');
  }

  // 7. Render Freshness & Shelf-Life Table
  function renderFreshnessTable() {
    const tbody = document.getElementById('freshness-table-body');
    if (!tbody) return;

    const filtered = productsData.filter(product => {
      const q = currentFreshnessSearch.toLowerCase();
      const matchesSearch =
        !q || product.name.toLowerCase().includes(q) || product.category.toLowerCase().includes(q);
      const matchesType = currentFreshnessType === 'all' || product.dateLabelType === currentFreshnessType;
      return matchesSearch && matchesType;
    });

    tbody.innerHTML = filtered
      .map(
        item => `
      <tr class="hover:bg-[#faf7f2] transition-colors">
        <td class="py-3.5 px-4 font-semibold text-[#261912]">
          <div class="flex items-center gap-3">
            <img src="${escapeHtml(item.imageUrl)}" alt="${escapeHtml(item.name)}" class="w-10 h-10 rounded-lg object-cover shrink-0 border border-[#ebdcd0]" />
            <div>
              <span class="block font-medium text-sm text-[#261912]">${escapeHtml(item.name)}</span>
              <span class="text-[11px] text-[#705d51] capitalize">${escapeHtml(item.category)}</span>
            </div>
          </div>
        </td>
        <td class="py-3.5 px-4 text-[#524137] text-xs">
          <span>${escapeHtml(item.batchSchedule)}</span>
        </td>
        <td class="py-3.5 px-4">
          ${
            item.dateLabelType === 'use-by'
              ? `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#fde8e8] text-[#9b2c2c] border border-[#f8b4b4]">Use-By Date</span>`
              : `<span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-[#eef6ec] text-[#2c6b32] border border-[#c3e6be]">Best-Before Date</span>`
          }
        </td>
        <td class="py-3.5 px-4 text-xs">
          <span class="font-bold text-[#8c3d19]">${
            item.shelfLifeDays === 1 ? 'Within 24 Hours' : `Up to ${item.shelfLifeDays} Days`
          }</span>
          <p class="text-[11px] text-[#6b584d] mt-0.5 max-w-xs">${escapeHtml(item.shelfLifeDetail)}</p>
        </td>
        <td class="py-3.5 px-4 text-[#524137] text-xs capitalize">
          ${escapeHtml(item.storageType.replace('-', ' '))}
        </td>
        <td class="py-3.5 px-4 text-right">
          <button onclick="window.sweetCrumbs.openProductModal('${escapeHtml(item.id)}')" class="px-3 py-1.5 text-xs font-semibold rounded-lg text-[#8c3d19] bg-[#faf2ea] hover:bg-[#8c3d19] hover:text-white transition-colors cursor-pointer">
            Care Card
          </button>
        </td>
      </tr>
    `
      )
      .join('');
  }

  // 8. Render Monthly Offers (12 Months Calendar)
  function renderMonthlyOffers() {
    const bar = document.getElementById('monthly-bar');
    const showcase = document.getElementById('monthly-showcase');
    if (!bar || !showcase) return;

    const now = new Date();
    const currentCalendarMonth = now.getMonth() + 1;

    bar.innerHTML = monthlyOffersData
      .map(offer => {
        const isSelected = currentSelectedMonth === offer.month;
        const isCurrent = offer.month === currentCalendarMonth;

        return `
          <button onclick="window.sweetCrumbs.setSelectedMonth(${offer.month})" class="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex flex-col items-center gap-0.5 cursor-pointer ${
            isSelected ? 'bg-[#8c3d19] text-white shadow-sm' : 'bg-white text-[#4a3a2f] hover:bg-[#faede2] border border-[#ebdcd0]'
          }">
            <div class="flex items-center gap-1">
              <span>${escapeHtml(offer.monthName.slice(0, 3))}</span>
              ${
                isCurrent
                  ? `<span class="w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-[#ffeedb]' : 'bg-[#8c3d19]'}"></span>`
                  : ''
              }
            </div>
            <span class="text-[10px] font-normal truncate max-w-[85px] ${
              isSelected ? 'text-[#fcece0]' : 'text-[#7e695c]'
            }">${escapeHtml(offer.festivalName.split(' ')[0])}</span>
          </button>
        `;
      })
      .join('');

    const activeOffer = monthlyOffersData.find(o => o.month === currentSelectedMonth) || monthlyOffersData[0];
    const todayStr = now.toISOString().split('T')[0];
    const isOngoing = todayStr >= activeOffer.startDate && todayStr <= activeOffer.endDate;

    showcase.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div class="lg:col-span-5 relative aspect-4/3 lg:aspect-auto min-h-[300px] bg-[#f0e7dd]">
          <img src="${escapeHtml(activeOffer.imageUrl)}" alt="${escapeHtml(activeOffer.title)}" class="w-full h-full object-cover" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-6 text-white">
            <span class="text-xs uppercase font-bold tracking-wider text-[#f5c298]">${escapeHtml(activeOffer.monthName)} Festival Collection</span>
            <h3 class="font-serif text-2xl font-bold mt-1">${escapeHtml(activeOffer.festivalName)}</h3>
            <p class="text-xs text-[#e8dcd0] mt-1">${escapeHtml(activeOffer.tagline)}</p>
          </div>
          <div class="absolute top-4 left-4">
            <span class="px-3 py-1 rounded-full text-xs font-bold text-white shadow ${isOngoing ? 'bg-[#1e613b]' : 'bg-[#8c3d19]'}">
              ${isOngoing ? 'Active This Month' : 'Festival Collection'}
            </span>
          </div>
        </div>

        <div class="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div>
            <div class="flex flex-wrap items-center justify-between gap-2 border-b border-[#ebdcd0] pb-4">
              <div>
                <span class="text-xs font-semibold text-[#8c3d19] uppercase tracking-wider block">Promotional Special</span>
                <h4 class="font-serif text-2xl font-bold text-[#261912] mt-0.5">${escapeHtml(activeOffer.title)}</h4>
              </div>
              <div class="bg-[#fff1eb] text-[#8c3d19] border border-[#f5cbb8] px-3.5 py-1.5 rounded-xl font-bold text-xs">
                🏷️ ${escapeHtml(activeOffer.discountBadge)}
              </div>
            </div>

            <p class="mt-4 text-xs sm:text-sm text-[#544338] leading-relaxed">${escapeHtml(activeOffer.description)}</p>
            <div class="mt-4 text-xs text-[#6e584a] bg-[#faf7f2] p-3 rounded-xl border border-[#ebdcd0]">
              📅 Validity: <strong>${escapeHtml(activeOffer.startDate)}</strong> to <strong>${escapeHtml(activeOffer.endDate)}</strong> (24h advance booking required)
            </div>

            <div class="mt-4">
              <span class="text-[11px] font-bold uppercase tracking-wider text-[#3d2f26] block mb-2">Included Festival Delicacies:</span>
              <div class="flex flex-wrap gap-1.5 text-xs">
                ${activeOffer.applicableProducts
                  .map(p => `<span class="bg-[#f0e7dd] text-[#3d2f26] px-2.5 py-1 rounded-md font-medium">${escapeHtml(p)}</span>`)
                  .join('')}
              </div>
            </div>
          </div>

          <div class="pt-6 border-t border-[#ebdcd0] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-center gap-2">
              <span class="text-xs text-[#544338] font-medium">Coupon Code:</span>
              <div class="flex items-center bg-[#f5ede2] border border-[#d9c5b2] rounded-lg px-3 py-1.5">
                <span class="font-mono font-bold text-xs text-[#8c3d19]">${escapeHtml(activeOffer.couponCode)}</span>
                <button onclick="window.sweetCrumbs.copyCoupon('${escapeHtml(activeOffer.couponCode)}', this)" class="ml-2 text-[11px] text-[#544338] hover:text-[#8c3d19] cursor-pointer">Copy</button>
              </div>
            </div>

            <button onclick="window.sweetCrumbs.claimFestivalOffer('${escapeHtml(activeOffer.couponCode)}')" class="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#8c3d19] hover:bg-[#702e11] shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer">
              <span>✨</span><span>Enquire for This Festival</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // 9. Render Coupons
  function renderCoupons() {
    const container = document.getElementById('coupons-grid');
    if (!container) return;

    container.innerHTML = couponsData
      .map(
        coupon => `
      <div class="bg-white rounded-2xl border border-[#ebdcd0] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
        <div class="absolute top-0 left-0 right-0 h-1.5 bg-[#8c3d19]"></div>
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-[11px] font-bold uppercase tracking-wider text-[#8c3d19]">${escapeHtml(coupon.discountBadge)}</span>
            <span class="text-[11px] text-[#705e52]">Min. $${coupon.minOrderAmount}</span>
          </div>
          <div class="bg-[#faf7f2] border border-dashed border-[#d9c7b4] p-3 rounded-xl flex items-center justify-between mb-3">
            <span class="font-mono font-bold text-sm tracking-widest text-[#261912]">${escapeHtml(coupon.code)}</span>
            <button onclick="window.sweetCrumbs.copyCoupon('${escapeHtml(coupon.code)}', this)" class="text-xs text-[#8c3d19] hover:underline cursor-pointer">Copy</button>
          </div>
          <p class="text-xs text-[#524137] leading-relaxed">${escapeHtml(coupon.description)}</p>
          <div class="mt-3 text-[10px] text-[#806959] space-y-0.5 border-t border-[#f0e4d7] pt-2">
            <div>📅 Valid until: ${escapeHtml(coupon.validUntil)}</div>
            ${coupon.terms.map(t => `<div>• ${escapeHtml(t)}</div>`).join('')}
          </div>
        </div>
        <div class="mt-4 pt-3 border-t border-[#f0e4d7]">
          <button onclick="window.sweetCrumbs.applyCouponToForm('${escapeHtml(coupon.code)}')" class="w-full py-2 px-3 text-xs font-semibold rounded-lg text-[#8c3d19] bg-[#faf2ea] hover:bg-[#8c3d19] hover:text-white transition-all cursor-pointer">
            Use in Enquiry
          </button>
        </div>
      </div>
    `
      )
      .join('');
  }

  // 10. Populate Enquiry Product Dropdown
  function populateEnquiryProductSelect() {
    const select = document.getElementById('enquiry-product');
    if (!select) return;

    select.innerHTML = `
      <optgroup label="Cakes & Celebrations">
        <option value="Belgian Dark Chocolate Silk Cake">Belgian Dark Chocolate Silk Cake</option>
        <option value="Japanese Strawberry Chantilly Chiffon">Japanese Strawberry Chantilly Chiffon</option>
        <option value="Custom Bespoke Celebration Cake">Custom Bespoke Celebration Cake (Specify below)</option>
      </optgroup>
      <optgroup label="Pastries & Viennoiserie">
        <option value="Pure Normandy Butter Croissant">Pure Normandy Butter Croissant</option>
        <option value="Valrhona Double Chocolate Pain au Chocolat">Valrhona Double Chocolate Pain au Chocolat</option>
        <option value="Belgian Dark Chocolate Ganache Éclair">Belgian Dark Chocolate Ganache Éclair</option>
        <option value="Tahitian Vanilla Bean Mille-Feuille">Tahitian Vanilla Bean Mille-Feuille</option>
        <option value="Piedmont Hazelnut Paris-Brest">Piedmont Hazelnut Paris-Brest</option>
        <option value="Fresh Raspberry & Bronte Pistachio Tart">Fresh Raspberry & Bronte Pistachio Tart</option>
        <option value="Twice-Baked Roasted Almond Croissant">Twice-Baked Roasted Almond Croissant</option>
        <option value="Spiced Caramelized Peach Danish">Spiced Caramelized Peach Danish</option>
        <option value="Seasonal Spiced Plum & Cardamom Brioche Knot">Seasonal Spiced Plum & Cardamom Brioche Knot</option>
      </optgroup>
      <optgroup label="Artisan Breads">
        <option value="Artisan 48-Hour Heritage Country Sourdough">Artisan 48-Hour Heritage Country Sourdough</option>
        <option value="Nordic Seeded Dark Rye Batard">Nordic Seeded Dark Rye Batard</option>
      </optgroup>
      <optgroup label="Cookies & Cupcakes">
        <option value="Valrhona Sea Salt Chunky Chocolate Cookies">Valrhona Sea Salt Chunky Chocolate Cookies</option>
        <option value="Madagascar Vanilla & Raspberry Buttercream Cupcakes">Madagascar Vanilla & Raspberry Buttercream Cupcakes</option>
      </optgroup>
      <optgroup label="Festivals & Hampers">
        <option value="Monthly Festival Special Hamper">Monthly Festival Special Hamper</option>
      </optgroup>
    `;
  }

  // ----------------------------------------------------
  // Modal & Action Handlers
  // ----------------------------------------------------

  function openProductModal(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-modal');
    const imgEl = document.getElementById('product-modal-img');
    imgEl.src = product.imageUrl;
    imgEl.alt = product.name;
    document.getElementById('product-modal-name').textContent = product.name;
    document.getElementById('product-modal-category').textContent = `${product.category} · ${product.subcategory || ''}`;
    document.getElementById('product-modal-price').textContent = product.isPricePlaceholder
      ? `${product.formattedPrice} (placeholder price)`
      : product.formattedPrice;

    document.getElementById('product-modal-body').innerHTML = `
      <div>
        <h4 class="font-bold text-sm text-[#261912] mb-1">About This Bake</h4>
        <p class="leading-relaxed text-[#5e4b3e]">${escapeHtml(product.detailedDescription)}</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-[#faf7f2] p-4 rounded-xl border border-[#ebdcd0]">
        <div>
          <strong class="font-bold text-[#8c3d19] block mb-0.5">Bake Schedule</strong>
          <span>${escapeHtml(product.batchSchedule)}</span>
        </div>
        <div>
          <strong class="font-bold text-[#8c3d19] block mb-0.5">${
            product.dateLabelType === 'use-by' ? 'Strict Use-By' : 'Peak Best-Before'
          }</strong>
          <span>${escapeHtml(product.shelfLifeDetail)}</span>
        </div>
        <div>
          <strong class="font-bold text-[#8c3d19] block mb-0.5">Storage Mode</strong>
          <span class="capitalize">${escapeHtml(product.storageType.replace('-', ' '))}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="bg-[#fcf9f5] p-4 rounded-xl border border-[#ebdcd0]">
          <h5 class="font-bold text-xs text-[#261912] mb-2">Ingredients Used:</h5>
          <div class="flex flex-wrap gap-1">
            ${product.ingredients
              .map(ing => `<span class="bg-white border border-[#ebdcd0] px-2 py-0.5 rounded text-[11px] text-[#423329]">${escapeHtml(ing)}</span>`)
              .join('')}
          </div>
        </div>
        <div class="bg-[#fff8eb] p-4 rounded-xl border border-[#f0d4a3] text-[11px] text-[#704d1c]">
          <h5 class="font-bold text-xs text-[#8a5d1b] mb-1">⚠️ Allergens &amp; Dietary:</h5>
          <p><strong>Contains:</strong> ${escapeHtml(product.allergens.join(', '))}</p>
          <div class="flex items-center gap-2 pt-1">
            ${product.isEggless ? `<span class="bg-[#eef6ec] text-[#2c6b32] px-2 py-0.5 rounded font-bold">100% Eggless</span>` : ''}
            ${product.isVegetarian ? `<span class="bg-[#eef6ec] text-[#2c6b32] px-2 py-0.5 rounded font-bold">Vegetarian</span>` : ''}
          </div>
        </div>
      </div>

      <div class="bg-[#f5ede2] p-4 rounded-xl border border-[#ebdcd0] space-y-2">
        <div><strong class="block text-[#261912]">Storage Instructions:</strong><p>${escapeHtml(product.storageInstructions)}</p></div>
        <div><strong class="block text-[#261912]">Handling &amp; Slicing Advice:</strong><p>${escapeHtml(product.handlingTips)}</p></div>
      </div>
    `;

    document.getElementById('product-modal-whatsapp').onclick = () => {
      enquireProductOnWhatsApp(product.id);
    };

    document.getElementById('product-modal-enquire').onclick = () => {
      prefillEnquiry(product.id);
      modal.classList.add('hidden');
    };

    modal.classList.remove('hidden');
  }

  function openRecipeModal(recipeId) {
    const recipe = recipesData.find(r => r.id === recipeId);
    if (!recipe) return;

    const modal = document.getElementById('recipe-modal');
    document.getElementById('recipe-modal-meta').textContent = `${recipe.category} · ${recipe.difficulty}`;
    document.getElementById('recipe-modal-title').textContent = recipe.title;
    document.getElementById('recipe-modal-subtitle').textContent = recipe.subtitle;

    document.getElementById('recipe-modal-body').innerHTML = `
      <div class="bg-[#fff8eb] border border-[#f0d4a3] p-4 rounded-xl text-xs text-[#8a5d1b]">
        <p class="font-semibold">${escapeHtml(recipe.approvalNotice)}</p>
        <p class="mt-1 text-[#6b4715]">${escapeHtml(recipe.story)}</p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#faf7f2] p-4 rounded-xl border border-[#ebdcd0] text-center text-xs">
        <div><span class="text-[#8c3d19] font-bold block text-sm">Prep Time</span><span>${escapeHtml(recipe.prepTime)}</span></div>
        <div><span class="text-[#8c3d19] font-bold block text-sm">Bake Time</span><span>${escapeHtml(recipe.bakeTime)}</span></div>
        <div><span class="text-[#8c3d19] font-bold block text-sm">Yield</span><span>${escapeHtml(recipe.yieldInfo)}</span></div>
        <div><span class="text-[#8c3d19] font-bold block text-sm">Skill Level</span><span>${escapeHtml(recipe.difficulty)}</span></div>
      </div>

      <div>
        <h4 class="font-serif text-lg font-bold text-[#261912] mb-3">Ingredients &amp; Baker's Percentages</h4>
        <div class="border border-[#ebdcd0] rounded-xl overflow-hidden">
          <table class="w-full text-left text-xs">
            <thead class="bg-[#f5ede2] text-[#3d2f26] font-semibold border-b border-[#ebdcd0]">
              <tr><th class="py-2.5 px-3">Ingredient</th><th class="py-2.5 px-3">Measure</th><th class="py-2.5 px-3">Baker's %</th></tr>
            </thead>
            <tbody class="divide-y divide-[#f0e4d7]">
              ${recipe.ingredients
                .map(
                  (ing, idx) => `
                <tr class="${idx % 2 === 0 ? 'bg-white' : 'bg-[#faf7f2]'}">
                  <td class="py-2 px-3 font-medium text-[#261912]">${escapeHtml(ing.item)}</td>
                  <td class="py-2 px-3 text-[#5e4b3e] font-semibold">${escapeHtml(ing.amount)}</td>
                  <td class="py-2 px-3 text-[#8c3d19] font-mono">${escapeHtml(ing.bakersPercentage || '—')}</td>
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h4 class="font-serif text-lg font-bold text-[#261912] mb-3">Step-by-Step Method</h4>
        <div class="space-y-4">
          ${recipe.steps
            .map(
              step => `
            <div class="bg-[#faf7f2] p-4 rounded-xl border border-[#ebdcd0] flex gap-4">
              <div class="w-7 h-7 rounded-full bg-[#8c3d19] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                ${step.stepNumber}
              </div>
              <div class="space-y-1.5 flex-1">
                <h5 class="font-bold text-sm text-[#261912]">${escapeHtml(step.title)}</h5>
                <p class="text-xs text-[#524137] leading-relaxed">${escapeHtml(step.instruction)}</p>
                ${
                  step.bakerTip
                    ? `<div class="text-[11px] bg-[#fffbf2] p-2 rounded-md border border-[#f5debe] text-[#825419]"><strong>Baker's Pro-Tip:</strong> ${escapeHtml(step.bakerTip)}</div>`
                    : ''
                }
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
  }

  function updateAdminEnquiriesBadge() {
    const countBadge = document.getElementById('admin-enquiries-count');
    if (countBadge) {
      countBadge.textContent = String(loadStoredEnquiries().length);
    }
  }

  function openOwnerModal() {
    const modal = document.getElementById('admin-modal');
    updateAdminEnquiriesBadge();
    renderOwnerPortalTab('products');
    modal.classList.remove('hidden');
  }

  function renderOwnerPortalTab(tabName) {
    const body = document.getElementById('admin-modal-body');
    if (!body) return;

    const tabProducts = document.getElementById('admin-tab-products');
    const tabEnquiries = document.getElementById('admin-tab-enquiries');
    const tabArch = document.getElementById('admin-tab-architecture');

    if (tabProducts) {
      tabProducts.className = `py-3 px-4 text-xs font-semibold border-b-2 cursor-pointer ${
        tabName === 'products' ? 'border-[#8c3d19] text-[#8c3d19]' : 'border-transparent text-[#6e584a]'
      }`;
    }
    if (tabEnquiries) {
      tabEnquiries.className = `py-3 px-4 text-xs font-semibold border-b-2 cursor-pointer ${
        tabName === 'enquiries' ? 'border-[#8c3d19] text-[#8c3d19]' : 'border-transparent text-[#6e584a]'
      }`;
    }
    if (tabArch) {
      tabArch.className = `py-3 px-4 text-xs font-semibold border-b-2 cursor-pointer ${
        tabName === 'architecture' ? 'border-[#8c3d19] text-[#8c3d19]' : 'border-transparent text-[#6e584a]'
      }`;
    }

    if (tabName === 'products') {
      body.innerHTML = `
        <div class="space-y-6">
          <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#faf7f2] p-4 rounded-xl border border-[#ebdcd0]">
            <div>
              <label class="text-xs font-semibold text-[#261912] block mb-1">Select Product to Edit Price &amp; Stock:</label>
              <select id="owner-product-select" class="text-xs bg-white border border-[#d9c7b4] text-[#261912] rounded-lg px-3 py-2" onchange="window.sweetCrumbs.loadOwnerProductForm(this.value)">
                ${productsData
                  .map(
                    p =>
                      `<option value="${escapeHtml(p.id)}">${escapeHtml(p.name)} — ${escapeHtml(p.formattedPrice)} ${
                        p.isBestSeller ? '★ Best Seller' : ''
                      }</option>`
                  )
                  .join('')}
              </select>
            </div>
            <button onclick="window.sweetCrumbs.exportCatalogJSON()" class="px-4 py-2 text-xs font-semibold rounded-lg text-[#8c3d19] bg-white border border-[#d9c7b4] hover:bg-[#8c3d19] hover:text-white transition-all cursor-pointer shadow-xs">
              📥 Export Products JSON
            </button>
          </div>

          <div id="owner-product-editor" class="bg-[#fcf9f5] p-6 rounded-2xl border border-[#ebdcd0] space-y-4">
            <!-- Populated by loadOwnerProductForm -->
          </div>
        </div>
      `;
      loadOwnerProductForm(productsData[0]?.id || '');
    } else if (tabName === 'enquiries') {
      body.innerHTML = `
        <div class="space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 class="font-serif text-lg font-bold text-[#261912]">Customer Enquiries Log</h4>
              <p class="text-xs text-[#705e52]">Stored locally in your browser (localStorage) for instant static access</p>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="window.sweetCrumbs.exportEnquiriesJSON()" class="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8c3d19] bg-white border border-[#d9c7b4] hover:bg-[#8c3d19] hover:text-white transition-all cursor-pointer">
                📥 Export Log
              </button>
              <button onclick="window.sweetCrumbs.fetchEnquiriesForOwner()" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#faf7f2] border border-[#d9c7b4] hover:bg-[#ebdcd0] cursor-pointer">
                🔄 Refresh Log
              </button>
            </div>
          </div>
          <div id="owner-enquiries-list" class="space-y-3">
            <p class="text-xs text-[#705e52]">Loading saved enquiries...</p>
          </div>
        </div>
      `;
      fetchEnquiriesForOwner();
    } else if (tabName === 'architecture') {
      body.innerHTML = `
        <div class="space-y-4 text-xs text-[#524137] leading-relaxed">
          <div class="bg-[#fff8eb] p-4 rounded-xl border border-[#f0d4a3] text-[#8a5d1b]">
            <h4 class="font-bold text-sm mb-1">Pure Static Web Architecture</h4>
            <p>This website runs 100% natively in any modern browser using semantic <strong>HTML5</strong> (<code>index.html</code>), pure <strong>CSS3</strong> (<code>css/style.css</code>), and <strong>Vanilla JavaScript ES6+</strong> (<code>js/main.js</code>) with zero build tools or backend dependencies.</p>
          </div>
          <div class="space-y-2">
            <h5 class="font-bold text-[#261912]">Client-Side Capabilities:</h5>
            <ul class="list-disc pl-5 space-y-1">
              <li><strong>Interactive Reservation Engine:</strong> Validates customer fields, generates official booking reference codes (<code>SC-2026-XXXX</code>), and persists logs in browser <code>localStorage</code>.</li>
              <li><strong>Coupon Verification Engine:</strong> Evaluates percentage and flat-rate vouchers plus minimum order thresholds directly in JavaScript.</li>
              <li><strong>Owner Catalog Overrides &amp; JSON Export:</strong> Updates live pricing, stock availability, and best-seller badges immediately and exports clean JSON for permanent updates.</li>
            </ul>
          </div>
        </div>
      `;
    }
  }

  function loadOwnerProductForm(productId) {
    const editor = document.getElementById('owner-product-editor');
    if (!editor) return;

    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    editor.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${escapeHtml(product.imageUrl)}" alt="${escapeHtml(product.name)}" class="w-14 h-14 rounded-xl object-cover border border-[#ebdcd0]" />
        <div>
          <h4 class="font-serif text-lg font-bold text-[#261912]">${escapeHtml(product.name)}</h4>
          <span class="text-xs text-[#705e52] capitalize">${escapeHtml(product.category)} · ${escapeHtml(product.subcategory || '')}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label class="font-semibold text-[#3b2d24] block mb-1">Verified Selling Price ($)</label>
          <input type="number" id="owner-edit-price" step="0.25" min="0.5" value="${product.price}" class="w-full px-3 py-2 bg-white border border-[#d9c7b4] rounded-lg" />
        </div>
        <div>
          <label class="font-semibold text-[#3b2d24] block mb-1">Shelf Life (Days)</label>
          <input type="number" id="owner-edit-shelflife" min="1" value="${product.shelfLifeDays}" class="w-full px-3 py-2 bg-white border border-[#d9c7b4] rounded-lg" />
        </div>
        <div class="sm:col-span-2">
          <label class="font-semibold text-[#3b2d24] block mb-1">Daily Batch Schedule</label>
          <input type="text" id="owner-edit-schedule" value="${escapeHtml(product.batchSchedule)}" class="w-full px-3 py-2 bg-white border border-[#d9c7b4] rounded-lg" />
        </div>
      </div>

      <div class="pt-3 border-t border-[#ebdcd0] flex flex-wrap items-center gap-6 text-xs text-[#3b2d24]">
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" id="owner-edit-bestseller" ${product.isBestSeller ? 'checked' : ''} class="rounded text-[#8c3d19]" />
          <span class="font-semibold">Featured in Best-Sellers</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" id="owner-edit-available" ${product.isAvailable ? 'checked' : ''} class="rounded text-[#8c3d19]" />
          <span class="font-semibold">Currently Available / In Stock</span>
        </label>
      </div>

      <div class="pt-2 flex items-center justify-between">
        <button onclick="window.sweetCrumbs.saveProductChanges('${escapeHtml(product.id)}')" class="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#8c3d19] hover:bg-[#702e11] cursor-pointer shadow-xs">
          Save Product Settings
        </button>
        <span id="owner-save-notice" class="hidden text-xs text-[#2b723d] font-bold">✓ Saved to live site!</span>
      </div>
    `;
  }

  function saveProductChanges(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const price = parseFloat(document.getElementById('owner-edit-price').value) || product.price;
    const shelfLife = parseInt(document.getElementById('owner-edit-shelflife').value, 10) || product.shelfLifeDays;
    const schedule = document.getElementById('owner-edit-schedule').value;
    const isBest = document.getElementById('owner-edit-bestseller').checked;
    const isAvail = document.getElementById('owner-edit-available').checked;

    product.price = price;
    product.formattedPrice = `${bakeryConfig.currencySymbol}${price.toFixed(2)}`;
    product.shelfLifeDays = shelfLife;
    product.batchSchedule = schedule;
    product.isBestSeller = isBest;
    product.isAvailable = isAvail;
    product.isPricePlaceholder = false;

    saveProductOverride(product);

    const notice = document.getElementById('owner-save-notice');
    if (notice) {
      notice.classList.remove('hidden');
      setTimeout(() => notice.classList.add('hidden'), 2500);
    }

    renderBestSellers();
    renderSpecialPastries();
    renderCatalog();
    renderFreshnessTable();
  }

  function fetchEnquiriesForOwner() {
    const list = document.getElementById('owner-enquiries-list');
    if (!list) return;

    const enquiries = loadStoredEnquiries();
    updateAdminEnquiriesBadge();

    if (enquiries.length === 0) {
      list.innerHTML = `<div class="p-6 bg-[#faf7f2] rounded-xl text-center text-xs text-[#705e52]">No enquiries recorded yet. Submit one from the homepage!</div>`;
      return;
    }

    list.innerHTML = enquiries
      .map(
        enq => `
      <div class="bg-[#faf7f2] p-4 rounded-xl border border-[#ebdcd0] text-xs space-y-2">
        <div class="flex items-center justify-between border-b border-[#ebdcd0] pb-2">
          <div class="flex items-center gap-2">
            <span class="font-mono font-bold text-[#8c3d19]">${escapeHtml(enq.referenceNumber)}</span>
            <span class="font-semibold text-[#261912]">${escapeHtml(enq.customerName)}</span>
          </div>
          <span class="text-[#8c7463]">${escapeHtml(new Date(enq.timestamp).toLocaleString())}</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-[#544338]">
          <div>📞 ${escapeHtml(enq.phoneNumber)}</div>
          <div>✉️ ${escapeHtml(enq.emailAddress)}</div>
          <div>📅 Required: <strong>${escapeHtml(enq.requiredDate)}</strong></div>
        </div>
        <div class="bg-white p-2.5 rounded-lg border border-[#ebdcd0] text-[11px]">
          <strong>Item:</strong> ${escapeHtml(enq.productName)} (${escapeHtml(enq.cakeSize)}, Qty: ${enq.productQuantity}) · <strong>Flavour:</strong> ${escapeHtml(enq.preferredFlavour)}
          ${enq.customDesignRequirements ? `<div><strong>Custom Design:</strong> ${escapeHtml(enq.customDesignRequirements)}</div>` : ''}
          ${enq.couponCode ? `<div class="text-[#1e613b]"><strong>Promo:</strong> ${escapeHtml(enq.couponCode)} (${escapeHtml(enq.discountSummary || 'Applied')})</div>` : ''}
        </div>
      </div>
    `
      )
      .join('');
  }

  function downloadJSON(data, filename) {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const a = document.createElement('a');
    a.setAttribute('href', dataStr);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function exportCatalogJSON() {
    downloadJSON(productsData, 'sweet-crumbs-products.json');
  }

  function exportEnquiriesJSON() {
    downloadJSON(loadStoredEnquiries(), 'sweet-crumbs-enquiries.json');
  }

  function copyCoupon(code, btn) {
    const orig = btn.textContent;
    const onCopied = () => {
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.textContent = orig;
      }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(code).then(onCopied).catch(() => fallbackCopyText(code, onCopied));
    } else {
      fallbackCopyText(code, onCopied);
    }
  }

  function fallbackCopyText(text, callback) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
    } catch (_err) {
      // Clipboard fallback unavailable
    }
    ta.remove();
    if (callback) callback();
  }

  function applyCouponToForm(code) {
    const input = document.getElementById('enquiry-coupon');
    if (input) {
      input.value = code;
    }
    const formEl = document.getElementById('enquiry-form');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
  }

  function claimFestivalOffer(code) {
    const productSelect = document.getElementById('enquiry-product');
    if (productSelect) {
      productSelect.value = 'Monthly Festival Special Hamper';
    }
    applyCouponToForm(code);
  }

  function prefillEnquiry(productId, explicitSize) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const chosenSize = explicitSize || selectedSizesMap[product.id] || product.defaultSize;

    const selectProduct = document.getElementById('enquiry-product');
    if (selectProduct) {
      let found = false;
      for (const opt of selectProduct.options) {
        if (opt.value === product.name) {
          opt.selected = true;
          found = true;
          break;
        }
      }
      if (!found) {
        selectProduct.value = 'Custom Bespoke Celebration Cake';
      }
    }

    const selectSize = document.getElementById('enquiry-size');
    if (selectSize && chosenSize) {
      let matched = false;
      for (const opt of selectSize.options) {
        if (opt.value === chosenSize) {
          opt.selected = true;
          matched = true;
          break;
        }
      }
      if (!matched) {
        const dynamicOpt = document.createElement('option');
        dynamicOpt.value = chosenSize;
        dynamicOpt.textContent = chosenSize;
        dynamicOpt.selected = true;
        selectSize.appendChild(dynamicOpt);
      }
    }

    const banner = document.getElementById('enquiry-preselection-banner');
    const bannerText = document.getElementById('preselection-banner-text');
    if (banner && bannerText) {
      bannerText.innerHTML = `Pre-selected: <strong>${escapeHtml(product.name)}</strong> (${escapeHtml(chosenSize)})`;
      banner.classList.remove('hidden');
    }

    const formSection = document.getElementById('enquiry-form');
    if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
  }

  function enquireOnWhatsApp(productName, size, price) {
    const msg = `Hello ${bakeryConfig.name}! I would like to enquire about "${productName}" (${size}, sample price: ${price}). Could you please advise current availability?`;
    openWhatsAppChat(msg);
  }

  function enquireProductOnWhatsApp(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;
    const chosenSize = selectedSizesMap[product.id] || product.defaultSize;
    enquireOnWhatsApp(product.name, chosenSize, product.formattedPrice);
  }

  function setPastryFilter(filterId) {
    currentPastryFilter = filterId;
    renderSpecialPastries();
  }

  function setCatalogCategory(catId) {
    currentCatalogCategory = catId;
    renderCatalog();
  }

  function resetCatalogFilters() {
    currentCatalogSearch = '';
    currentCatalogCategory = 'all';
    currentFilterEggless = false;
    currentFilterVegetarian = false;
    currentCatalogSort = 'featured';

    const sInput = document.getElementById('catalog-search');
    if (sInput) sInput.value = '';
    const egglessCheck = document.getElementById('filter-eggless');
    if (egglessCheck) egglessCheck.checked = false;
    const vegCheck = document.getElementById('filter-vegetarian');
    if (vegCheck) vegCheck.checked = false;
    const sortSelect = document.getElementById('catalog-sort');
    if (sortSelect) sortSelect.value = 'featured';

    renderCatalog();
  }

  function setStorageTab(tabId) {
    currentSelectedStorageTab = tabId;
    renderStorageGuide();
  }

  function setSelectedMonth(m) {
    currentSelectedMonth = m;
    renderMonthlyOffers();
  }

  function updateProductSize(productId, size) {
    selectedSizesMap[productId] = size;
  }

  // ----------------------------------------------------
  // Global Event Binding & Form Submissions
  // ----------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    // Expose public handler API on window for dynamic markup event calls
    window.sweetCrumbs = {
      openProductModal,
      openRecipeModal,
      openOwnerModal,
      prefillEnquiry,
      enquireOnWhatsApp,
      enquireProductOnWhatsApp,
      copyCoupon,
      applyCouponToForm,
      claimFestivalOffer,
      setPastryFilter,
      setCatalogCategory,
      resetCatalogFilters,
      setStorageTab,
      setSelectedMonth,
      updateProductSize,
      loadOwnerProductForm,
      saveProductChanges,
      fetchEnquiriesForOwner,
      exportCatalogJSON,
      exportEnquiriesJSON
    };

    // Set minimum date for enquiry (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDateStr = tomorrow.toISOString().split('T')[0];
    const dateInput = document.getElementById('enquiry-date');
    if (dateInput) {
      dateInput.min = minDateStr;
    }

    // Initial renders
    populateEnquiryProductSelect();
    renderBestSellers();
    renderSpecialPastries();
    renderCatalog();
    renderRecipes();
    renderStorageGuide();
    renderPackaging();
    renderFreshnessTable();
    renderMonthlyOffers();
    renderCoupons();
    updateAdminEnquiriesBadge();

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-menu-drawer');
    if (mobileMenuBtn && mobileDrawer) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('hidden');
      });
      document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => mobileDrawer.classList.add('hidden'));
      });
    }

    // Clear Preselection button
    document.getElementById('btn-clear-preselection')?.addEventListener('click', () => {
      document.getElementById('enquiry-preselection-banner')?.classList.add('hidden');
    });

    // WhatsApp global buttons
    document.getElementById('nav-whatsapp-btn')?.addEventListener('click', () => openWhatsAppChat());
    document.getElementById('hero-whatsapp-btn')?.addEventListener('click', () => openWhatsAppChat());
    document.getElementById('footer-whatsapp-btn')?.addEventListener('click', () => openWhatsAppChat());
    document.getElementById('btn-floating-whatsapp')?.addEventListener('click', () => openWhatsAppChat());
    document.getElementById('btn-close-tooltip')?.addEventListener('click', () => {
      document.getElementById('whatsapp-tooltip')?.classList.add('hidden');
    });

    // Owner Portal modal buttons
    document.getElementById('btn-open-owner-top')?.addEventListener('click', openOwnerModal);
    document.getElementById('btn-open-owner-mobile')?.addEventListener('click', openOwnerModal);
    document.getElementById('btn-footer-owner')?.addEventListener('click', openOwnerModal);
    document.getElementById('btn-bottom-owner')?.addEventListener('click', openOwnerModal);
    document.getElementById('btn-close-admin-modal')?.addEventListener('click', () => {
      document.getElementById('admin-modal')?.classList.add('hidden');
    });
    document.getElementById('btn-close-admin-modal-bottom')?.addEventListener('click', () => {
      document.getElementById('admin-modal')?.classList.add('hidden');
    });

    // Owner tabs
    document.getElementById('admin-tab-products')?.addEventListener('click', () => renderOwnerPortalTab('products'));
    document.getElementById('admin-tab-enquiries')?.addEventListener('click', () => renderOwnerPortalTab('enquiries'));
    document.getElementById('admin-tab-architecture')?.addEventListener('click', () => renderOwnerPortalTab('architecture'));

    // Close modals
    document.getElementById('btn-close-product-modal')?.addEventListener('click', () => {
      document.getElementById('product-modal')?.classList.add('hidden');
    });
    document.getElementById('btn-close-recipe-modal')?.addEventListener('click', () => {
      document.getElementById('recipe-modal')?.classList.add('hidden');
    });
    document.getElementById('btn-close-recipe-modal-bottom')?.addEventListener('click', () => {
      document.getElementById('recipe-modal')?.classList.add('hidden');
    });
    document.getElementById('btn-close-success')?.addEventListener('click', () => {
      document.getElementById('enquiry-success-modal')?.classList.add('hidden');
    });

    // Backdrop click and Escape key close for modals
    ['recipe-modal', 'product-modal', 'enquiry-success-modal', 'admin-modal'].forEach(modalId => {
      const modalEl = document.getElementById(modalId);
      if (modalEl) {
        modalEl.addEventListener('click', e => {
          if (e.target === modalEl) {
            modalEl.classList.add('hidden');
          }
        });
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        ['recipe-modal', 'product-modal', 'enquiry-success-modal', 'admin-modal'].forEach(modalId => {
          document.getElementById(modalId)?.classList.add('hidden');
        });
      }
    });

    // Search & Catalog listeners
    document.getElementById('catalog-search')?.addEventListener('input', e => {
      currentCatalogSearch = e.target.value;
      renderCatalog();
    });
    document.getElementById('catalog-sort')?.addEventListener('change', e => {
      currentCatalogSort = e.target.value;
      renderCatalog();
    });
    document.getElementById('filter-eggless')?.addEventListener('change', e => {
      currentFilterEggless = e.target.checked;
      renderCatalog();
    });
    document.getElementById('filter-vegetarian')?.addEventListener('change', e => {
      currentFilterVegetarian = e.target.checked;
      renderCatalog();
    });
    document.getElementById('btn-reset-filters')?.addEventListener('click', resetCatalogFilters);

    // Freshness Table Search & Filter tabs
    document.getElementById('freshness-search')?.addEventListener('input', e => {
      currentFreshnessSearch = e.target.value;
      renderFreshnessTable();
    });
    document.querySelectorAll('#freshness-type-filter button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('#freshness-type-filter button').forEach(b => {
          b.className = 'px-3 py-1 rounded-md font-medium text-[#4e3d33] hover:text-black cursor-pointer';
        });
        btn.className = 'px-3 py-1 rounded-md font-medium bg-[#8c3d19] text-white cursor-pointer';
        currentFreshnessType = btn.getAttribute('data-type') || 'all';
        renderFreshnessTable();
      });
    });

    // Quantity +/- buttons
    const qtyInput = document.getElementById('enquiry-qty');
    document.getElementById('btn-qty-minus')?.addEventListener('click', () => {
      if (qtyInput) qtyInput.value = String(Math.max(1, (parseInt(qtyInput.value, 10) || 1) - 1));
    });
    document.getElementById('btn-qty-plus')?.addEventListener('click', () => {
      if (qtyInput) qtyInput.value = String(Math.min(100, (parseInt(qtyInput.value, 10) || 1) + 1));
    });

    // Client-Side Coupon Validator Form
    const couponTestForm = document.getElementById('coupon-test-form');
    const couponResultDiv = document.getElementById('coupon-test-result');
    if (couponTestForm && couponResultDiv) {
      couponTestForm.addEventListener('submit', e => {
        e.preventDefault();
        const code = document.getElementById('test-coupon-code')?.value?.trim().toUpperCase();
        const subtotal = parseFloat(document.getElementById('test-coupon-subtotal')?.value) || 0;
        if (!code) return;

        const data = validateCouponCode(code, subtotal);
        couponResultDiv.classList.remove('hidden');

        if (data.valid) {
          couponResultDiv.className =
            'mt-4 p-4 rounded-xl text-xs border bg-[#f0f9f1] border-[#bfe5c5] text-[#1e613b]';
          couponResultDiv.innerHTML = `
            <strong>✓ Coupon Validated!</strong>
            <p class="mt-0.5">${escapeHtml(data.message)}</p>
            <div class="mt-2 pt-2 border-t border-[#c6e9cc] flex items-center justify-between">
              <span>Calculated Discount:</span>
              <strong class="text-sm font-bold">$${data.discountAmount.toFixed(2)}</strong>
            </div>
          `;
        } else {
          couponResultDiv.className =
            'mt-4 p-4 rounded-xl text-xs border bg-[#fdf2f2] border-[#f8c4c4] text-[#9b2c2c]';
          couponResultDiv.innerHTML = `
            <strong>✕ Invalid Coupon</strong>
            <p class="mt-0.5">${escapeHtml(data.message || 'Coupon code not accepted.')}</p>
          `;
        }
      });
    }

    // Client-Side Bakery Enquiry Form Submission
    const enquiryForm = document.getElementById('bakery-enquiry-form');
    let isSubmittingEnquiry = false;

    if (enquiryForm) {
      enquiryForm.addEventListener('submit', e => {
        e.preventDefault();
        if (isSubmittingEnquiry) return;

        const name = document.getElementById('enquiry-name')?.value?.trim() || '';
        const phone = document.getElementById('enquiry-phone')?.value?.trim() || '';
        const email = document.getElementById('enquiry-email')?.value?.trim() || '';
        const product = document.getElementById('enquiry-product')?.value?.trim() || '';
        const qty = parseInt(document.getElementById('enquiry-qty')?.value, 10) || 1;
        const size = document.getElementById('enquiry-size')?.value?.trim() || 'Standard';
        const flavour = document.getElementById('enquiry-flavour')?.value?.trim() || 'Classic Bakery Standard';
        const date = document.getElementById('enquiry-date')?.value?.trim() || '';
        const design = document.getElementById('enquiry-design')?.value?.trim() || '';
        const dietary = document.getElementById('enquiry-dietary')?.value?.trim() || 'Standard';
        const coupon = document.getElementById('enquiry-coupon')?.value?.trim().toUpperCase() || '';
        const message = document.getElementById('enquiry-message')?.value?.trim() || '';

        const errName = document.getElementById('err-name');
        const errPhone = document.getElementById('err-phone');
        const errEmail = document.getElementById('err-email');
        const errDate = document.getElementById('err-date');
        const serverErr = document.getElementById('form-server-error');

        if (errName) errName.classList.add('hidden');
        if (errPhone) errPhone.classList.add('hidden');
        if (errEmail) errEmail.classList.add('hidden');
        if (errDate) errDate.classList.add('hidden');
        if (serverErr) serverErr.classList.add('hidden');

        let hasErrors = false;

        if (!name || name.length < 2) {
          if (errName) {
            errName.textContent = 'Please enter your name (min 2 characters).';
            errName.classList.remove('hidden');
          }
          hasErrors = true;
        }

        const digits = phone.replace(/\D/g, '');
        if (!phone || digits.length < 7 || digits.length > 15) {
          if (errPhone) {
            errPhone.textContent = 'Please enter a valid telephone/mobile number (7–15 digits).';
            errPhone.classList.remove('hidden');
          }
          hasErrors = true;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          if (errEmail) {
            errEmail.textContent = 'Please enter a valid email address.';
            errEmail.classList.remove('hidden');
          }
          hasErrors = true;
        }

        if (!date) {
          if (errDate) {
            errDate.textContent = 'Please select your requested date.';
            errDate.classList.remove('hidden');
          }
          hasErrors = true;
        } else if (date < minDateStr) {
          if (errDate) {
            errDate.textContent = 'Orders require at least 24h advance reservation.';
            errDate.classList.remove('hidden');
          }
          hasErrors = true;
        }

        if (hasErrors) return;

        isSubmittingEnquiry = true;
        const submitBtn = document.getElementById('enquiry-submit-btn');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = 'Recording Enquiry...';
        }

        let discountSummary = '';
        if (coupon) {
          const rule = validCouponRules[coupon];
          if (rule) {
            discountSummary =
              rule.discountType === 'percentage'
                ? `${rule.value}% discount applied (${rule.desc})`
                : `$${rule.value}.00 flat discount applied (${rule.desc})`;
          }
        }

        const randomSuffix = Math.floor(1000 + Math.random() * 9000);
        const referenceNumber = `SC-${new Date().getFullYear()}-${randomSuffix}`;
        const timestamp = new Date().toISOString();

        const newEnquiry = {
          referenceNumber,
          timestamp,
          customerName: name,
          phoneNumber: phone,
          emailAddress: email,
          productName: product,
          productQuantity: Math.min(100, Math.max(1, qty)),
          cakeSize: size,
          preferredFlavour: flavour,
          customDesignRequirements: design,
          requiredDate: date,
          additionalMessage: message,
          dietaryPreference: dietary,
          couponCode: coupon || undefined,
          discountSummary: discountSummary || undefined,
          status: 'Received'
        };

        saveStoredEnquiry(newEnquiry);
        updateAdminEnquiriesBadge();

        // Populate and display confirmation modal
        const successModal = document.getElementById('enquiry-success-modal');
        document.getElementById('success-customer-name').textContent = `Thank You, ${newEnquiry.customerName}!`;
        document.getElementById('success-message').textContent =
          'Your enquiry has been successfully logged with Sweet Crumbs Bakery. Use your reference number below or send directly via WhatsApp to confirm with our pastry team.';
        document.getElementById('success-summary-card').innerHTML = `
          <div class="flex items-center justify-between border-b border-[#ebdcd0] pb-2">
            <strong class="text-[#8c3d19]">Booking Reference:</strong>
            <span class="font-mono font-bold text-[#261912]">${escapeHtml(newEnquiry.referenceNumber)}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-[#665447]">Item Requested:</span>
            <span class="font-semibold text-[#261912]">${escapeHtml(newEnquiry.productName)}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-[#665447]">Size &amp; Quantity:</span>
            <span>${escapeHtml(newEnquiry.cakeSize)} (Qty: ${newEnquiry.productQuantity})</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-[#665447]">Target Date:</span>
            <span class="font-semibold text-[#8c3d19]">${escapeHtml(newEnquiry.requiredDate)}</span>
          </div>
          ${
            newEnquiry.couponCode
              ? `<div class="flex items-center justify-between text-[#1e613b]"><span>Promo Code:</span><span class="font-mono font-bold">${escapeHtml(newEnquiry.couponCode)}</span></div>`
              : ''
          }
        `;

        document.getElementById('btn-success-whatsapp').onclick = () => {
          const waMsg = `Hello ${bakeryConfig.name}! I just submitted Enquiry #${newEnquiry.referenceNumber} for ${newEnquiry.productName} on ${newEnquiry.requiredDate}.`;
          openWhatsAppChat(waMsg);
        };

        successModal.classList.remove('hidden');
        enquiryForm.reset();
        document.getElementById('enquiry-preselection-banner')?.classList.add('hidden');

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>🚀</span><span>Submit Bakery Enquiry</span>';
        }
        isSubmittingEnquiry = false;
      });
    }

    // Enquiry via WhatsApp button on form
    document.getElementById('enquiry-whatsapp-btn')?.addEventListener('click', () => {
      const name = document.getElementById('enquiry-name')?.value?.trim();
      const product = document.getElementById('enquiry-product')?.value?.trim();
      const qty = document.getElementById('enquiry-qty')?.value;
      const size = document.getElementById('enquiry-size')?.value;
      const flavour = document.getElementById('enquiry-flavour')?.value;
      const date = document.getElementById('enquiry-date')?.value;
      const design = document.getElementById('enquiry-design')?.value?.trim();

      const msg = `Hello ${bakeryConfig.name}! I would like to place an enquiry for:\n- Product: ${product}\n- Qty: ${qty}\n- Size: ${size}\n- Flavour: ${flavour}\n- Date: ${date || 'Earliest available'}${
        name ? `\n- Name: ${name}` : ''
      }${design ? `\n- Notes: ${design}` : ''}`;
      openWhatsAppChat(msg);
    });
  });
})();
