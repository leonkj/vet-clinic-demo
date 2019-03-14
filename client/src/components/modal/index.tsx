import * as React from 'react';
import { Dialog, DialogActions, DialogTitle } from '@material-ui/core';

type ComponentProps = {
  title?: string;
  id: string;
  className?: string;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  children: React.ReactNode | React.ReactNode[];
  actions?: React.ReactElement[];
};

const Component = (props: ComponentProps) => {
  return (
    <Dialog
      aria-label={props.title}
      open={true}
      id={props.id}
      title={props.title}
    >
      {props.title && <DialogTitle>{props.title}</DialogTitle>}
      {props.children}
      {props.actions && <DialogActions>{props.actions}</DialogActions>}
    </Dialog>
  );
};

export const Modal = Component;
