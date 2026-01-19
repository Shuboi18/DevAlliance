const UserFeedCard = ({ feedStore }) => {
    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Error</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div className="flex items-center">
                        <button className="mx-2 btn btn-primary">Interested</button>
                        <button className="mx-2 btn btn-secondary">Ignore</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default UserFeedCard;