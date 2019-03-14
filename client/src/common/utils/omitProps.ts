import { mapProps } from 'recompose';
import _ from 'lodash';

export const omitProps = (keys: string[]) => {
  return mapProps((props: string[]) => {
    return _.omit(props, keys);
  });
};
