import "../App.css";

function AppCard({ key, AppTitle, AppIcon, Selected, OnClick }) {
    return (
        <div
            onClick={OnClick}
            className={`app-card ${Selected ? "selected" : ""} hover:selected`}
        >
            <div className="app-card-inner">

                <span className="app-card-title">
                    {AppTitle}
                </span>
            </div>
        </div>
    );
}

export default AppCard;