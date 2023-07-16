import * as React from "react";

const ContextMenu = () => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [menuPosition, setMenuPosition] = React.useState({ x: 0, y: 0 });

  const handleContextMenu = (e) => {
    e.preventDefault();
    setShowMenu(true);
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };

  // const handleMenuClose = () => {
  //   setShowMenu(false);
  // };

  return (
    <div onContextMenu={handleContextMenu}>
      <div style={{ position: 'relative' }}>
        {showMenu && (
          <div
            style={{
              position: 'absolute',
              top: menuPosition.y,
              left: menuPosition.x,
              backgroundColor: 'white',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.15)',
              padding: '5px',
            }}
          >
            {/* Context menu content */}
            <div>Menu item 1</div>
            <div>Menu item 2</div>
            <div>Menu item 3</div>
          </div>
        )}
      </div>

      {/* Rest of your component */}
    </div>
  );
};

export default ContextMenu;
