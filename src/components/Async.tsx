import * as React from 'react';

import Loader from '@components/Loader';

type componentType = React.ComponentClass<any> | null;

interface IAsyncState {
  component: componentType;
}

export default function asyncComponent(importComponent: any) {
  class AsyncComponent extends React.Component<any, IAsyncState> {
    constructor(props: any) {
      super(props);

      this.state = {
        component: null,
      };
    }

    async componentDidMount() {
      setTimeout(async () => {
        const { default: component } = await importComponent();

        this.setState({
          component: component,
        });
      }, 700);
    }

    render() {
      const C: componentType = this.state.component;
      return C ? <C {...this.props} /> : <Loader />;
    }
  }

  return AsyncComponent;
}
