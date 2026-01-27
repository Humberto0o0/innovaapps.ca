// Layout: centered content container.
import { cx } from "../../utils/cx";

export default function Container({ children, className }) {
  return <div className={cx("mx-auto max-w-6xl px-4", className)}>{children}</div>;
}
