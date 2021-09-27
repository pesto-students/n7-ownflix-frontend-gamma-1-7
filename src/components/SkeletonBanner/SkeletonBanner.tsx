import "./skeletonBanner.scss"
import SkeletonElement from "../SkeletonElement/SkeletonElement";
import SkeletonPoster from "../SkeletonPoster/SkeletonPoster";

const SkeletonBanner = () => {
	return (
		<div className="Skeleton__Banner">
			<div className="Skeleton__Banner--image">
				<SkeletonElement type="banner" />
			</div>
			<div className="Skeleton__Banner--content">
				<SkeletonElement type="title" />
				<div>
					<SkeletonElement type="title" />
				</div>
				<SkeletonElement type="text" />
				<div>
					<SkeletonElement type="text" />
				</div>
				<div className="Skeleton__inline">
					<SkeletonElement type="button" />
					<SkeletonElement type="button" />
				</div>
				<div className="Skeleton__Page">
					<SkeletonPoster />
				</div>

			</div>
		</div>
	);
};

export default SkeletonBanner