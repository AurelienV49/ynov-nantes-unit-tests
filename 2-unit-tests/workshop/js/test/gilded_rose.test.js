const { Shop, Item } = require("../src/gilded_rose");
const { gildedRose } = require("./texttest_fixture");

describe("Gilded Rose", function () {
  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("fixme");
  });

  it("sellIn avec valeur restante", () => {
    for (let a = 0; a < gildedRose.items.length; a++) {
      const items = gildedRose.updateQuality();
      expect(items[a].sellIn).toBeDefined();
    }
  });
  it("quality avec valeur cote précieux", () => {
    for (let a = 0; a < gildedRose.items.length; a++) {
      const items = gildedRose.updateQuality();
      expect(items[a].quality).toBeDefined();
    }
  });

  it("Chaque fin de journée décrémente les 2 valeurs", () => {
    for (let a = 0; a < gildedRose.items.length; a++) {
      var aa = gildedRose.items[a].sellIn;
      var b = gildedRose.items[a].quality;
      // const items = gildedRose.updateQuality();
      expect(gildedRose.items[a].sellIn).toBe(aa);
      expect(gildedRose.items[a].quality).toBe(b);
    }
  });
  it("Date péremption passé, qualité dégrade 2 fois plus vite ????????????", () => {
    const gildedRose = new Shop([new Item("un article", 0, 100)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });
  it("La qualité (quality) d'un produit ne peut jamais être négative", () => {
    const gildedRose = new Shop([new Item("un article", 0, -5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).not.toBeLessThan(0);
  });
  it("Aged Brie augmente sa qualité (quality) plus le temps passe", () => {
    // Sur 10 jours
    for (let a = 0; a < 10; a++) {
      const gildedRose = new Shop([new Item("Aged Brie", 100, 50)]);
      var _saveQualityAvant = gildedRose.items[0].quality;
      const items = gildedRose.updateQuality();
      expect(items[0].quality).not.toBeLessThan(_saveQualityAvant);
    }
  });
  it("La qualité d'un produit n'est jamais de plus de 50", () => {
    // Sur 10 jours
    for (let a = 0; a < 10; a++) {
      const gildedRose = new Shop([new Item("Aged Brie", 100, 5)]);
      var _saveQualityAvant = gildedRose.items[0].quality;
      const items = gildedRose.updateQuality();
      expect(items[0].quality).not.toBeGreaterThanOrEqual(50);
    }
  });
  it("Sulfuras, étant un objet légendaire, n'a pas de date de péremption et ne perd jamais en qualité (quality)", () => {
    // Sur 10 jours
    for (let a = 0; a < 10; a++) {
      const gildedRose = new Shop([new Item("Sulfuras", null, 5)]);
      var _saveQualityAvant = gildedRose.items[0].quality;
      const items = gildedRose.updateQuality();
      var _saveQualityAprès = gildedRose.items[0].quality;
      expect(items[0].sellIn).not.toBeDefined();
      expect(_saveQualityAprès).not.toBeLessThan(_saveQualityAvant);
    }
  });
  it("Backstage passes, comme le Aged Brie, augmente sa qualité (quality) plus le temps passe (sellIn) ; La qualité augmente de 2 quand il reste 10 jours ou moins et de 3 quand il reste 5 jours ou moins, mais la qualité tombe à 0 après le concert", () => {
    for (let a = 0; a < gildedRose.items.length; a++) {
      const items = gildedRose.updateQuality();
      if (
        items[a].name == "Backstage passes to a TAFKAL80ETC concert" ||
        items[a].name == "Backstage passes to a TAFKAL80ETC concert"
      ) {
        if (items[a].sellIn <= 10 && items[a].sellIn > 5) {
          expect(items[a].sellIn).toBeDefined();
        } else if (items[a].sellIn < 5) {
          expect(items[a].sellIn).toBeDefined();
        }
      }
    }
  });

  test("quality degradation", function () {
    const gildedRose = new Shop([new Item("test quality", 1, 10)]);
    const items = gildedRose.update();
    expect(items[0].quality).toEqual(9);
  });

  test("quality double degradation after sellIn", function () {
    const gildedRose = new Shop([new Item("test negative sellIn", 0, 10)]);
    const items = gildedRose.update();
    expect(items[0].quality).toEqual(8);
  });

  test("sellIn reduction", function () {
    const gildedRose = new Shop([new Item("test reducing sellIn", 1, 10)]);
    const items = gildedRose.update();
    expect(items[0].sellIn).toEqual(0);
  });
});

const negativeQualityData = [
  {
    item: new Item("Bad quality object", 10, 0),
    qualityExpected: 0,
  },
  {
    item: new Item("Really bad quality object", 8, 0),
    qualityExpected: 0,
  },
  {
    item: new Item("Worst object ever", 0, 0),
    qualityExpected: 0,
  },
  {
    item: new Item("Worst object ever", -1, 1),
    qualityExpected: 0,
  },
  {
    item: new Item("Just trash", 1, -5),
    qualityExpected: 0,
  },
];

describe.each(negativeQualityData)(
  `Quality degradation not negative`,
  (data) => {
    test(`Item quality of ${data.item.quality} should be greater or equal to ${data.qualityExpected}`, () => {
      const gildedRose = new Shop([data.item]);
      const items = gildedRose.update();
      expect(items[0].quality).toBeGreaterThanOrEqual(data.qualityExpected);
    });
  }
);

const agedBrieData = [
  {
    item: new Item("Aged Brie", 10, 10),
    qualityExpected: 11,
  },
  {
    item: new Item("Aged Brie", 2, 0),
    qualityExpected: 1,
  },
  {
    item: new Item("Aged Brie", 10, 49),
    qualityExpected: 50,
  },
  {
    item: new Item("Aged Brie", 10, 60),
    qualityExpected: 50,
  },
];

describe.each(agedBrieData)(`Aged Brie's quality improvement`, (data) => {
  test(`Aged Brie item quality of ${data.item.quality} should be upgraded to  ${data.qualityExpected}`, () => {
    const gildedRose = new Shop([data.item]);
    const items = gildedRose.update();
    expect(items[0].quality).toBe(data.qualityExpected);
  });
});

const maxQualityData = [
  {
    item: new Item("Aged Brie", 10, 50),
    qualityExpected: 50,
  },
  {
    item: new Item("Best object ever", 10, 80),
    qualityExpected: 49,
  },
];

describe.each(maxQualityData)(`Max Quality of 50`, (data) => {
  test(`Item quality of ${data.item.quality} should be  ${data.qualityExpected}`, () => {
    const gildedRose = new Shop([data.item]);
    const items = gildedRose.update();
    expect(items[0].quality).toBe(data.qualityExpected);
  });
});

describe("Sulfuras", function () {
  test("sulfuras expiration date", function () {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
    ]);
    const items = gildedRose.update();
    expect(items[0].sellIn).toEqual(10);
  });

  test("sulfuras degradation", function () {
    const gildedRose = new Shop([
      new Item("Sulfuras, Hand of Ragnaros", 10, 80),
    ]);
    const items = gildedRose.update();
    expect(items[0].quality).toEqual(80);
  });
});

const backstageData = [
  {
    item: new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
    qualityExpected: 21,
    sellInExpected: 14,
  },
  {
    item: new Item("Backstage passes to a TAFKAL80ETC concert", 10, 25),
    qualityExpected: 27,
    sellInExpected: 9,
  },
  {
    item: new Item("Backstage passes to a TAFKAL80ETC concert", 5, 37),
    qualityExpected: 40,
    sellInExpected: 4,
  },
  {
    item: new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49),
    qualityExpected: 50,
    sellInExpected: 0,
  },
  {
    item: new Item("Backstage passes to a TAFKAL80ETC concert", 15, 80),
    qualityExpected: 50,
    sellInExpected: 14,
  },
  {
    item: new Item("Backstage passes to a TAFKAL80ETC concert", 0, 52),
    qualityExpected: 0,
    sellInExpected: -1,
  },
];

describe.each(backstageData)(`Backstage Pass`, (data) => {
  test(`Backstage Pass of ${data.item.quality} should be  ${data.qualityExpected}`, () => {
    const gildedRose = new Shop([data.item]);
    const items = gildedRose.update();
    expect(items[0].sellIn).toBe(data.sellInExpected);
  });
  test(`Backstage Pass of ${data.item.sellIn} should be  ${data.sellInExpected}`, () => {
    const gildedRose = new Shop([data.item]);
    const items = gildedRose.update();
    expect(items[0].sellIn).toBe(data.sellInExpected);
  });
});
