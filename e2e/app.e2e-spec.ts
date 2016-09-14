import { ReasonUxPage } from './app.po';

describe('reason-ux App', function() {
  let page: ReasonUxPage;

  beforeEach(() => {
    page = new ReasonUxPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
