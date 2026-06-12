import { Link } from "react-router-dom";

export default function PageNavigation({
  backIcon,
  backLabel,
  backTo,
  nextIcon,
  nextLabel,
  nextTo
}) {
  return (
    <div className="top-page-navigation">
      {backTo && (
        <Link to={backTo} className="back-link">
          {backIcon}
          {backLabel}
        </Link>
      )}
      {nextTo && (
        <Link to={nextTo} className="primary-button">
          {nextLabel}
          {nextIcon}
        </Link>
      )}
    </div>
  );
}
