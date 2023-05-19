import { useState } from "react";
import { story1, story2, story3, story4 } from "../../../../components/Image";
import className from "./className";

const stories = [
    {
        id: 0,
        title: "CHƯƠNG TRÌNH GÂY QUỸ WOMEN SPEAK 2023",
        tag: "#LIBE-3min",
        image1: story1,
        image2: story2
    },
    {
        id: 1,
        title: "IU ĐI NGẠI CHI!",
        tag: "#LIBE-3min",
        image1: story3,
        image2: story4
    }
]

const Story = () => {

    return (
        <div className={className.wrapper}>
            {stories.map((story, index) => (
                <StoryItem
                    key={index}
                    index={index}
                    story={story} />
            ))}
        </div>
    );
}

const StoryItem = ({ story, index }) => {

    const [image, setImage] = useState(story.image1);

    return (
        <div className={index % 2 == 0 ? className.itemEven : className.itemOdd}>
            <img
                src={image}
                className={className.image}
                onMouseOver={() => setImage(story.image2)}
                onMouseLeave={() => setImage(story.image1)}
                alt={story.title} />
            <div className={className.content}>
                <div className={className.title}>{story.title ?? ""}</div>
                <div className={className.tag}>{story.tag ?? ""}</div>
                <div className={className.button}>View story</div>
            </div>
        </div>
    )
}

export default Story