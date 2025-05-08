import { ReactNode } from "react";
import { Theme } from "@radix-ui/themes";
import { Toaster } from 'react-hot-toast';

import { AlertProvider } from "../contexts";
import { Alert } from '../components'

type ProviderProps = {
  children: ReactNode;
};

const Providers = (props: ProviderProps) => {
  return (
    <AlertProvider>
      <Theme>{props.children}</Theme>
      <Alert />
      <Toaster />
    </AlertProvider>
  );
};

export default Providers;
