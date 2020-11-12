import Page from '@core/Page';
import Excel from '@/components/excel/Excel';
import Header from '@/components/header/Header';
import Toolbar from '@/components/toolbar/Toolbar';
import Formula from '@/components/formula/Formula';
import Table from '@/components/table/Table';
import rootReducer from '@/store/reducers/rootReducer.reducer';
import Store from '@/store/Store';
import { debounce, storage } from '@core/utils';
import { initialState } from '@/store/actions/initialState.action';

export default class ExcelPage extends Page {
  getRoot() {
    console.log(this.params);
    const store = new Store(rootReducer, initialState);

    const stateListener = debounce((state) => {
      storage('excel-state', state);
      console.log('App state:', state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });
    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
