interface successLoginProps {
  message: string;
  status: boolean;
  buyer: {
    name: string;
    type: string;
  };
}

interface errorLoginProps {
  message: string;
  status: boolean;
}
