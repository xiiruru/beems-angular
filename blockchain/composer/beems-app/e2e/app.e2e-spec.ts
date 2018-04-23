import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for beems-app', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be beems-app', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('beems-app');
    })
  });

  it('navbar-brand should be beems@0.0.1',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('beems@0.0.1');
  });

  
    it('AssetLocation component should be loadable',() => {
      page.navigateTo('/AssetLocation');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('AssetLocation');
    });

    it('AssetLocation table should have 4 columns',() => {
      page.navigateTo('/AssetLocation');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  

});
