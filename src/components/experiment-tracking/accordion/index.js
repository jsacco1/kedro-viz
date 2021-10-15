import React, { useState } from 'react';
import classnames from 'classnames';

import './accordion.css';

/**
 * A collapsable container component.
 * @param {object} children React children
 * @param {string} heading Text to display on the top-level
 * @param {string|null} headingDetail A secondary text string for additional context
 */
const Accordion = ({
  children,
  heading = '',
  headingDetail = null,
  layout = 'right',
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={classnames('accordion', {
        'accordion--alt': layout === 'left',
      })}
    >
      <div className="accordion__heading">
        {layout === 'left' && (
          <button
            aria-label={`${
              collapsed ? 'Show' : 'Hide'
            } ${heading.toLowerCase()}`}
            onClick={() => setCollapsed(!collapsed)}
            className={classnames('accordion__toggle', {
              'accordion__toggle--alt': collapsed,
            })}
          />
        )}
        <div className="accordion__title">
          {heading}
          {headingDetail && (
            <span className="accordion__title__detail">{headingDetail}</span>
          )}
        </div>
        {layout === 'right' && (
          <button
            aria-label={`${
              collapsed ? 'Show' : 'Hide'
            } ${heading.toLowerCase()}`}
            onClick={() => setCollapsed(!collapsed)}
            className={classnames('accordion__toggle', {
              'accordion__toggle--alt': collapsed,
            })}
          />
        )}
      </div>
      <div className={collapsed ? 'accordion__content--hide' : null}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
