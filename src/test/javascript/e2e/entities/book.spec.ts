import { browser, element, by } from 'protractor';
import { NavBarPage } from './../page-objects/jhi-page-objects';

describe('Book e2e test', () => {

    let navBarPage: NavBarPage;
    let bookDialogPage: BookDialogPage;
    let bookComponentsPage: BookComponentsPage;

    beforeAll(() => {
        browser.get('/');
        browser.waitForAngular();
        navBarPage = new NavBarPage();
        navBarPage.getSignInPage().autoSignInUsing('admin', 'admin');
        browser.waitForAngular();
    });

    it('should load Books', () => {
        navBarPage.goToEntity('book');
        bookComponentsPage = new BookComponentsPage();
        expect(bookComponentsPage.getTitle())
            .toMatch(/Books/);

    });

    it('should load create Book dialog', () => {
        bookComponentsPage.clickOnCreateButton();
        bookDialogPage = new BookDialogPage();
        expect(bookDialogPage.getModalTitle())
            .toMatch(/Create or edit a Book/);
        bookDialogPage.close();
    });

    it('should create and save Books', () => {
        bookComponentsPage.clickOnCreateButton();
        bookDialogPage.setTitleInput('title');
        expect(bookDialogPage.getTitleInput()).toMatch('title');
        bookDialogPage.setPriceInput('5');
        expect(bookDialogPage.getPriceInput()).toMatch('5');
        bookDialogPage.authorSelectLastOption();
        bookDialogPage.save();
        expect(bookDialogPage.getSaveButton().isPresent()).toBeFalsy();
    });

    afterAll(() => {
        navBarPage.autoSignOut();
    });
});

export class BookComponentsPage {
    createButton = element(by.css('.jh-create-entity'));
    title = element.all(by.css('jhi-book div h2 span')).first();

    clickOnCreateButton() {
        return this.createButton.click();
    }

    getTitle() {
        return this.title.getText();
    }
}

export class BookDialogPage {
    modalTitle = element(by.css('h4#myBookLabel'));
    saveButton = element(by.css('.modal-footer .btn.btn-primary'));
    closeButton = element(by.css('button.close'));
    titleInput = element(by.css('input#field_title'));
    priceInput = element(by.css('input#field_price'));
    authorSelect = element(by.css('select#field_author'));

    getModalTitle() {
        return this.modalTitle.getText();
    }

    setTitleInput = function(title) {
        this.titleInput.sendKeys(title);
    };

    getTitleInput = function() {
        return this.titleInput.getAttribute('value');
    };

    setPriceInput = function(price) {
        this.priceInput.sendKeys(price);
    };

    getPriceInput = function() {
        return this.priceInput.getAttribute('value');
    };

    authorSelectLastOption = function() {
        this.authorSelect.all(by.tagName('option')).last().click();
    };

    authorSelectOption = function(option) {
        this.authorSelect.sendKeys(option);
    };

    getAuthorSelect = function() {
        return this.authorSelect;
    };

    getAuthorSelectedOption = function() {
        return this.authorSelect.element(by.css('option:checked')).getText();
    };

    save() {
        this.saveButton.click();
    }

    close() {
        this.closeButton.click();
    }

    getSaveButton() {
        return this.saveButton;
    }
}
