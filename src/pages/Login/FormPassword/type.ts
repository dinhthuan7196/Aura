export type InfoProps = {
  email?: string;
  code?: string;
  password?: string;
  action: 'reset-password' | 'validate-code' | 'set-password' | 'done';
};

export type ActionsProps = {
  setInfo: (values: InfoProps) => void;
  onActions: (props: any) => void;
};
