import { NgOneBinPage } from './app.po';

describe('ng-one-bin App', () => {
  let page: NgOneBinPage;

  beforeEach(() => {
    page = new NgOneBinPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
