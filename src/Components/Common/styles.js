export function getAdminItemStyle(item, selecteditem, hoveredKey) {

  let itemStyle = 'admin-item';
  if (selecteditem) {
    itemStyle = (item.Id !== selecteditem.Id ? 'admin-item' : 'admin-selected-item');
    if (hoveredKey && hoveredKey !== selecteditem.Id)
      itemStyle = 'admin-hovered-item';
  } else {
    itemStyle = 'admin-item';
    if (hoveredKey)
      itemStyle = 'admin-hovered-item';
  }

  return itemStyle
}