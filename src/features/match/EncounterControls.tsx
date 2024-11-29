import React from "react";
import { FaHeart, FaTimes } from 'react-icons/fa'; // Font Awesome icons
import { MdCheckCircle } from 'react-icons/md';  // Material Design icons

const EncountersControls = () => {
  return (
    <div className="encounters-controls__cell">
      <div className="encounters-controls__actions">
        {/* Dislike Button */}
        <div className="encounters-controls__action">
          <div
            className="encounters-action tooltip-activator encounters-action--dislike"
            role="button"
            data-qa-role="encounters-action-dislike"

            aria-label="Pass"
          >
            <div className="encounters-action__icon">
              <FaTimes className="h-6 w-6 text-gray-700" />
            </div>
            <div className="tooltip" data-direction="top" data-align="center" data-qa-role="tooltip">
              <div className="tooltip__content">
                <div className="p-3 text-color-white">Pass</div>
              </div>
            </div>
          </div>
        </div>

        {/* SuperSwipe Button */}
        <div className="encounters-controls__action">
          <div
            className="encounters-action tooltip-activator encounters-action--superswipe"
            role="button"
            data-qa-role="encounters-action-superswipe"

            aria-label="SuperSwipe"
          >
            <div className="encounters-action__icon">
              <FaHeart className="h-6 w-6 text-yellow-500" />
            </div>
            <div className="tooltip" data-direction="top" data-align="center" data-qa-role="tooltip">
              <div className="tooltip__content">
                <div className="p-3 text-color-white">SuperSwipe</div>
              </div>
            </div>
          </div>
        </div>

        {/* Like Button */}
        <div className="encounters-controls__action">
          <div
            className="encounters-action tooltip-activator encounters-action--like"
            role="button"
            data-qa-role="encounters-action-like"
            aria-label="Like"
          >
            <div className="encounters-action__icon">
              <MdCheckCircle className="h-6 w-6 text-red-500" />
            </div>
            <div className="tooltip" data-direction="top" data-align="center" data-qa-role="tooltip">
              <div className="tooltip__content">
                <div className="p-3 text-color-white">Like</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncountersControls;
