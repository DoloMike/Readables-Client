import React from 'react'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import keyIndex from 'react-key-index'

export default function CategoryMenu ({ categories }) {
  categories = keyIndex(categories, 1);

  return (
    <div>
      <IconMenu
        iconButtonElement={<IconButton><MenuIcon /></IconButton>}
        >
          <MenuItem primaryText="CATEGORIES" disabled={true}/>
        <Divider />
        {categories.map(cat => (
          <MenuItem primaryText={cat.name} key={cat._nameId} />
        ))}
      </IconMenu>
    </div>
  )
}
