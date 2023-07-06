import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#ededed"
    foregroundColor="#ffffff"
    {...props}
  >
    <circle cx="133" cy="138" r="122" /> 
    <rect x="0" y="423" rx="10" ry="10" width="90" height="27" /> 
    <rect x="118" y="415" rx="30" ry="30" width="155" height="45" /> 
    <rect x="0" y="322" rx="14" ry="14" width="280" height="73" /> 
    <rect x="0" y="274" rx="14" ry="14" width="280" height="27" />
  </ContentLoader>
)

export default Skeleton
