import { PlaidLinkOptions, Plaid } from './types';

export interface PlaidFactory {
  open: Function;
  exit: Function;
  destroy: Function;
}

interface FactoryInternalState {
  plaid: Plaid | null;
  open: boolean;
  onExitCallback: Function | null;
}

const renameKeyInObject = (
  o: { [index: string]: any },
  oldKey: string,
  newKey: string
): object => {
  const newObject = {};
  delete Object.assign(newObject, o, { [newKey]: o[oldKey] })[oldKey];
  return newObject;
};

/**
 * Wrap link handler creation and instance to clean up iframe via destroy() method
 */
export const createPlaid = (options: PlaidLinkOptions) => {
  const state: FactoryInternalState = {
    plaid: null,
    open: false,
    onExitCallback: null,
  };

  // If Plaid is not available, throw an Error
  if (typeof window === 'undefined' || !window.Plaid) {
    throw new Error('Plaid not loaded');
  }

  const config = renameKeyInObject(
    options,
    'publicKey',
    'key'
  ) as PlaidLinkOptions;

  state.plaid = window.Plaid.create({
    ...config,
    onExit: (...params: any) => {
      console.log("factory tsx on exit func")
      state.open = false;
      config.onExit && config.onExit(...params);
      state.onExitCallback && state.onExitCallback();
    },
  });

  const open = () => {
    if (!state.plaid) {
      return;
    }
    console.log("factory tsx on open func")
    state.open = true;
    state.onExitCallback = null;
    state.plaid.open();
  };

  const exit = (exitOptions: any, callback: Function) => {
    console.log("factory tsx exit const ")
    if (!state.open || !state.plaid) {
      callback && callback();
      return;
    }
    state.onExitCallback = callback;
    state.plaid.exit(exitOptions);
    if (exitOptions && exitOptions.force) {
      state.open = false;
    }
  };

  const destroy = () => {
    if (!state.plaid) {
      return;
    }
    console.log("typescript destroy func")
    state.plaid.destroy();
    state.plaid = null;
  };

  return {
    open,
    exit,
    destroy,
  };
};