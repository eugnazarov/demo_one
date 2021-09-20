import React, {useState} from 'react';
import {Text, Touchable, TouchableOpacity, View} from 'react-native';
import {Badge, ListItem} from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';
import Collapsible from 'react-native-collapsible';

const RequestItem = ({item}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const getBadgeStatus = status => {
    switch (status) {
      case 'pending':
        return {color: 'warning', text: 'На рассмотрении'};
      case 'rejected':
        return {color: 'error', text: 'Отклонен'};
      case 'approved':
        return {color: 'success', text: 'Одобрен'};
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        item.reason && setIsCollapsed(!isCollapsed);
      }}>
      <ListItem bottomDivider>
        <ListItem.Content>
          <View style={tw`flex-row w-full justify-between`}>
            <ListItem.Title>
              Запрос на {item.type} {item.date}
            </ListItem.Title>
            <Badge
              status={getBadgeStatus(item.status).color}
              value={getBadgeStatus(item.status).text}
            />
          </View>
          <Collapsible collapsed={isCollapsed}>
            <Text>{item.reason && `Причина: ${item.reason}`}</Text>
          </Collapsible>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default RequestItem;
