import "./feedItem.css";
import React, { useState, useEffect } from "react";
import { useInViewport } from "../../utils/useInViewport";
import axios from "axios";

interface Props {
  post: any;
}

const FeedItem = ({ post }: Props) => {
  const [followText, setFollowText] = useState<string>("Follow");
  const [liked, setLiked] = useState<boolean>(post.didLike);
  const { isInViewport, ref } = useInViewport();

  //if user views the post, send a get requset (impression)
  useEffect(() => {
    if (isInViewport) {
      axios
        .get(`https://www.tedooo.com/?userId=${post.userId}&itemId=${post.id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  }, [isInViewport]);

  //change follow text upon click
  const followBtn = (): void => {
    if (followText === "Follow") setFollowText("Following");
    else setFollowText("Follow");
  };

  //convert the date of the post and return how long ago it was posted
  const convertDate = (dateString: string): string => {
    const datePosted = new Date(dateString);
    const dateNow = new Date();
    const timestamp = new Date(dateNow.getTime() - datePosted.getTime());
    if (timestamp.getDay() > 0) return `${timestamp.getDay()}d`;
    else if (timestamp.getHours() > 0) return `${timestamp.getHours()}h`;
    else if (timestamp.getMinutes() > 0) return `${timestamp.getMinutes()}m`;
    return `${timestamp.getSeconds()}s`;
  };

  return (
    <div className="post-container" ref={ref}>
      <div className="post-user-container">
        <div className="user-avatar">
          <img src={post.avatar} alt="user avatar" />
        </div>
        <div className="user-text">
          <div className="text-header">
            <div className="title-container">
              <span className="title-text">
                {post.shopName ? post.shopName : post.username}{" "}
              </span>
              <div className="dot"></div>
              <div className="follow-button" onClick={() => followBtn()}>
                <span>{followText}</span>
              </div>
            </div>
            {post.premium ? (
              <div className="pro-tag-container">
                <div className="image-wrapper-pro">
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                  />
                </div>
                <span className="pro-text">Pro</span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="text-subheader">
            <span className="text">
              {post.username} · {convertDate(post.date)}{" "}
            </span>
          </div>
        </div>
      </div>
      <div className="post-details-container">
        <div className="post-text">
          <span>{post.text}</span>
        </div>
        <div className="post-images-container">
          {post.images.length > 0 ? (
            post.images.length > 1 ? (
              <div className="post-image-grid">
                <div className="post-image-container">
                  <div className="post-image-wrapper">
                    <img src={post.images[0]} alt="post" />
                  </div>
                </div>
                <div className="post-image-container">
                  <div className="post-image-wrapper">
                    <img src={post.images[1]} alt="post " />
                  </div>
                </div>
              </div>
            ) : (
              <div className="post-image-container">
                <div className="post-image-wrapper">
                  <img src={post.images[0]} alt="post " />
                </div>
              </div>
            )
          ) : (
            <></>
          )}
        </div>
        <div className="post-footer">
          <div className="post-numbers">
            {post.likes > 0 ? (
              <div className="post-reaction">
                <span>
                  <span className="reaction-number">{post.likes} </span>
                  <span className="reaction-text">Likes</span>
                </span>
              </div>
            ) : (
              <></>
            )}
            {post.comments > 0 ? (
              <div className="post-reaction">
                <span>
                  <span className="reaction-number">{post.comments} </span>
                  <span className="reaction-text">
                    {post.comments > 1 ? "Comments" : "Comment"}
                  </span>
                </span>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="post-actions">
            <div className="post-buttons-container">
              <button
                className="action-button"
                onClick={() => (liked ? setLiked(false) : setLiked(true))}
              >
                <svg
                  className={liked ? "" : "liked-button"}
                  xmlns="http://www.w3.org/2000/svg"
                  height="20"
                  width="20"
                >
                  <path
                    fill="currentColor"
                    d="m10 16.438-.75-.688q-2.062-1.833-3.396-3.135-1.333-1.303-2.094-2.292-.76-.99-1.052-1.792-.291-.802-.291-1.635 0-1.667 1.156-2.823t2.823-1.156q1.021 0 1.979.489.958.49 1.625 1.406.667-.916 1.625-1.406.958-.489 1.979-.489 1.667 0 2.823 1.156t1.156 2.823q0 .833-.281 1.614-.281.782-1.042 1.761-.76.979-2.104 2.302t-3.448 3.219Z"
                  />
                </svg>

                <span
                  className={liked ? "button-text" : "liked-text button-text"}
                >
                  {liked ? "Like" : "Liked"}
                </span>
              </button>
              <button className="action-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                  <path
                    fill="#737877"
                    d="M2.083 17.542V3.667q0-.667.459-1.125.458-.459 1.125-.459h12.666q.667 0 1.125.459.459.458.459 1.125V13q0 .667-.459 1.125-.458.458-1.125.458H5.042Zm1.334-3.23 1.062-1.062h11.854q.105 0 .177-.073.073-.073.073-.177V3.667q0-.105-.073-.177-.072-.073-.177-.073H3.667q-.105 0-.177.073-.073.072-.073.177Zm0-10.645v-.25 10.895Z"
                  />
                </svg>
                <span className="button-text">Comment</span>
              </button>
              <button className="action-button">
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20">
                  <path
                    fill="#737877"
                    d="M5.75 15.583q-.562 0-.948-.385-.385-.386-.385-.948V13H5.5v1.25q0 .083.083.167.084.083.167.083h8.5q.083 0 .167-.083.083-.084.083-.167V13h1.083v1.25q0 .562-.385.948-.386.385-.948.385Zm3.708-2.895V5.354L7.375 7.417l-.771-.75L10 3.271l3.396 3.396-.771.75-2.083-2.063v7.334Z"
                  />
                </svg>
                <span className="button-text">Share</span>
              </button>
            </div>
          </div>
          <div className="post-comments"></div>
          <div className="user-actions-wrapper">
            <div className="input-container">
              <div className="avatar-container">
                <img
                  className="input-avatar"
                  src="data:image/png;base64,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"
                  alt="profile"
                />
              </div>
              <div className="textarea-container">
                <textarea
                  placeholder="Write a comment..."
                  spellCheck={true}
                ></textarea>
              </div>
              <div className="image-upload-button">
                <input
                  type="file"
                  id="1678817311170"
                  data-multiple-caption="{count} files selected"
                  className="image-upload-input"
                  accept="image/x-png,image/jpeg,image/jpg,image/svg"
                ></input>
                <label htmlFor="1678817311170">
                  <div className="camera-icon">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      width="24px"
                    >
                      <path
                        d="M9 2.25a.75.75 0 0 0-.624.334L6.599 5.25H3A2.75 2.75 0 0 0 .25 8v11A2.75 2.75 0 0 0 3 21.75h18A2.75 2.75 0 0 0 23.75 19V8A2.75 2.75 0 0 0 21 5.25h-3.599l-1.777-2.666A.75.75 0 0 0 15 2.25H9ZM7.624 6.416 9.401 3.75H14.6l1.777 2.666A.75.75 0 0 0 17 6.75h4A1.25 1.25 0 0 1 22.25 8v11A1.25 1.25 0 0 1 21 20.25H3A1.25 1.25 0 0 1 1.75 19V8A1.25 1.25 0 0 1 3 6.75h4a.75.75 0 0 0 .624-.334ZM8.75 13a3.25 3.25 0 1 1 6.5 0 3.25 3.25 0 0 1-6.5 0ZM12 8.25a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5Z"
                        fill="#737877"
                      ></path>
                    </svg>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedItem;
