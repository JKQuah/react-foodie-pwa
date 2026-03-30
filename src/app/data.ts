export const USERS = [
  { id: '1', name: 'Sophie L.', avatar: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc0Njk2ODE5fDA&ixlib=rb-4.1.0&q=80&w=1080', distance: '1.2 km' },
  { id: '2', name: 'Marcus T.', avatar: 'https://images.unsplash.com/flagged/photo-1596479042555-9265a7fa7983?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3NDYzMDc1MXww&ixlib=rb-4.1.0&q=80&w=1080', distance: '0.8 km' },
  { id: '3', name: 'Jessica W.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&q=80', distance: '2.5 km' },
];

export const FOOD_POSTS = [
  { id: 'p1', userId: '1', dish: 'Spicy Tonkotsu Ramen', location: 'Ramen Kuroda', image: 'https://images.unsplash.com/photo-1697652974652-a2336106043b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMGJvd2x8ZW58MXx8fHwxNzc0Njg0MTk4fDA&ixlib=rb-4.1.0&q=80&w=1080', images: ['https://images.unsplash.com/photo-1697652974652-a2336106043b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyYW1lbiUyMGJvd2x8ZW58MXx8fHwxNzc0Njg0MTk4fDA&ixlib=rb-4.1.0&q=80&w=1080', 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=500&q=80'], likes: 24, comments: 3, time: '2h', caption: 'Best ramen in town, definitely coming back!' },
  { id: 'p2', userId: '2', dish: 'Double Smash Burger', location: 'Burger Joint', image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBhbmQlMjBmcmllc3xlbnwxfHx8fDE3NzQ3MDQ0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080', images: ['https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBhbmQlMjBmcmllc3xlbnwxfHx8fDE3NzQ3MDQ0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080'], likes: 45, comments: 8, time: '4h', caption: 'The cheese pull was insane 🧀🍔' },
  { id: 'p3', userId: '3', dish: 'Salmon Nigiri Platter', location: 'Sushi Zanmai', image: 'https://images.unsplash.com/photo-1664882589261-498d42a9ad44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHBsYXRlfGVufDF8fHx8MTc3NDYxOTE2MHww&ixlib=rb-4.1.0&q=80&w=1080', images: ['https://images.unsplash.com/photo-1664882589261-498d42a9ad44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHBsYXRlfGVufDF8fHx8MTc3NDYxOTE2MHww&ixlib=rb-4.1.0&q=80&w=1080', 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&q=80', 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=500&q=80'], likes: 112, comments: 15, time: '12h', caption: 'Fresh catch of the day 🍣✨' },
];

export const PLANS = [
  { id: 'pl1', hostId: '2', title: 'Burgers & Beers', time: 'Tonight, 7:00 PM', restaurant: 'Burger Joint', currentJoined: 2, maxJoined: 4, type: 'Casual' },
  { id: 'pl2', hostId: '1', title: 'Late Night Ramen', time: 'Tomorrow, 9:30 PM', restaurant: 'Ramen Kuroda', currentJoined: 3, maxJoined: 3, type: 'Full' },
];

// Curated Malaysia-focused list with cute pastel backgrounds and large emoji illustrations
export const MATCH_FOODS = [
  { id: 'f1', name: 'Nasi Lemak', illustration: '🥥', bgColor: '#E8F5E9', tag: '🔥 Local Favorite' },
  { id: 'f2', name: 'Roti Canai', illustration: '🥐', bgColor: '#FFF8E1', tag: '✨ Popular' },
  { id: 'f3', name: 'Char Kuey Teow', illustration: '🍳', bgColor: '#FFEBEE', tag: '🔥 Local Favorite' },
  { id: 'f4', name: 'Laksa', illustration: '🍜', bgColor: '#FCE4EC', tag: '🌶️ Spicy' },
  { id: 'f5', name: 'Satay', illustration: '🍢', bgColor: '#FFF3E0', tag: 'Night Market' },
  { id: 'f6', name: 'Pan Mee', illustration: '🍲', bgColor: '#E3F2FD', tag: 'Comfort' },
  { id: 'f7', name: 'Mee Goreng', illustration: '🍝', bgColor: '#FBE9E7', tag: 'Classic' },
  { id: 'f8', name: 'Burger', illustration: '🍔', bgColor: '#EFEBE9', tag: 'Casual' },
  { id: 'f9', name: 'Fried Chicken', illustration: '🍗', bgColor: '#FFF8E1', tag: 'Crispy' },
  { id: 'f10', name: 'Sushi', illustration: '🍣', bgColor: '#E8EAF6', tag: 'Fresh' },
  { id: 'f11', name: 'Korean BBQ', illustration: '🥓', bgColor: '#FCE4EC', tag: 'Social' },
  { id: 'f12', name: 'Dim Sum', illustration: '🥟', bgColor: '#FFF3E0', tag: 'Morning' },
  { id: 'f13', name: 'Coffee & Pastry', illustration: '☕', bgColor: '#EFEBE9', tag: 'Chill' },
  { id: 'f14', name: 'Bubble Tea', illustration: '🧋', bgColor: '#F3E5F5', tag: 'Sweet' },
  { id: 'f15', name: 'Pizza', illustration: '🍕', bgColor: '#FFF8E1', tag: 'Sharing' },
];

export const CHATS = [
  {
    id: 'c1',
    name: 'Sushi Tonight 🍣',
    participants: ['1', '2'],
    lastMessage: 'Sounds good! See you at 7.',
    timestamp: '10:42 AM',
    status: 'Confirmed',
    unread: 0,
    planDetails: {
      time: 'Tonight, 7:00 PM',
      restaurant: 'Sushi Zanmai'
    }
  },
  {
    id: 'c2',
    name: 'Burger & Beers 🍔',
    participants: ['2', '3'],
    lastMessage: 'Look at this!',
    timestamp: 'Yesterday',
    status: 'Planning',
    unread: 2,
    planDetails: null
  },
  {
    id: 'c3',
    name: 'Late Night Ramen 🍜',
    participants: ['1', '3'],
    lastMessage: 'That was awesome!',
    timestamp: 'Mon',
    status: 'Completed',
    unread: 0,
    planDetails: {
      time: 'Monday, 9:30 PM',
      restaurant: 'Ramen Kuroda'
    }
  }
];

export const MESSAGES: Record<string, any[]> = {
  'c1': [
    { id: 'm1', senderId: '1', text: 'Hey guys, anyone up for Sushi?', time: '10:00 AM', type: 'text' },
    { id: 'm2', senderId: 'system', text: 'Plan started: Sushi Tonight 🍣', time: '10:15 AM', type: 'system' },
    { id: 'm3', senderId: 'system', text: 'Plan confirmed for Tonight, 7:00 PM at Sushi Zanmai', time: '10:30 AM', type: 'system' },
    { id: 'm4', senderId: '2', text: 'Sounds good! See you at 7.', time: '10:42 AM', type: 'text' },
  ],
  'c2': [
    { id: 'm1', senderId: '3', text: 'Craving burgers right now...', time: 'Yesterday, 2:00 PM', type: 'text' },
    { id: 'm2', senderId: '2', postId: 'p2', text: 'Look at this cheese pull!', time: 'Yesterday, 2:05 PM', type: 'post' },
    { id: 'm3', senderId: '3', text: 'Whoa that looks amazing. Let\'s go!', time: 'Yesterday, 2:10 PM', type: 'text' },
  ],
  'c3': [
    { id: 'm1', senderId: 'system', text: 'Plan confirmed: Late Night Ramen 🍜 at Ramen Kuroda', time: 'Mon, 8:00 PM', type: 'system' },
    { id: 'm1b', senderId: 'system', time: 'Mon, 8:00 PM', type: 'plan', plan: { time: 'Monday, 9:30 PM', restaurant: 'Ramen Kuroda', participants: ['1', '3'] } },
    { id: 'm2', senderId: '1', text: 'I am here!', time: 'Mon, 9:25 PM', type: 'text' },
    { id: 'm3', senderId: '3', text: 'That was awesome!', time: 'Mon, 11:00 PM', type: 'text' },
  ]
};