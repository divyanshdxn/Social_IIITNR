interface Props {
  code?: number;
  message?: string;
  retry?: boolean;
  from?: string;
}
export const Error: React.FC<Props> = ({ code }) => {
  return <main>Error - {code}</main>;
};
