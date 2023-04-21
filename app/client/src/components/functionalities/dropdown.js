import * as React from 'react';

// import "./dropdown.css";

const DropDown = () => {
  return (
    <Dropdown
      trigger={<button>Select Map</button>}
      menu={[
        <button>Tag1</button>,
        <button>Tag2</button>,
        <button>Tag3</button>,
      ]}
    />
  );
};
  
const Dropdown = ({ trigger, menu }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="dropdown">
      {/* handles button click */}
      {React.cloneElement(trigger, {
        onClick: handleOpen,
      })}
      {/* opens menu on button click and renders menu items */}
      {open ? (
        <ul className="menu">
          {menu.map((menuItem, index) => (
            <li key={index} className="menu-item">
              {React.cloneElement(menuItem, {
                onClick: () => {
                  menuItem.props.onClick();
                  setOpen(false);
                },
              })}
            </li>
          ))}
        </ul>
      ) : null}
    <div>

    </div>
    </div>
  );
};

export default DropDown;