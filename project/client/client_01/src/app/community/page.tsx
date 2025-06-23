
'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, MessageSquare, Hash, Send, RadioTower, User as UserIcon, ArrowLeft, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for chat rooms
const chatRooms = [
    { id: 'general', name: 'General Discussion', icon: <Hash className="h-5 w-5" /> },
    { id: 'ai-robotics', name: 'AI & Robotics', icon: <MessageSquare className="h-5 w-5" /> },
    { id: 'projects', name: 'Project Showcase', icon: <RadioTower className="h-5 w-5" /> },
    { id: 'direct_messages', name: 'Direct Messages', icon: <UserIcon className="h-5 w-5" /> }, // This will control the DM tab content
];

// Mock messages for group chats
const mockMessages = {
    general: [
        { id: 1, user: 'Alice', avatar: 'https://placehold.co/40x40.png', hint: "woman thinking", text: 'Hello everyone! Glad to be here.', time: '10:00 AM', isSender: false },
        { id: 2, user: 'You', avatar: 'https://placehold.co/40x40.png', hint: "user avatar", text: 'Welcome, Alice! I\'m Bob.', time: '10:01 AM', isSender: true },
        { id: 3, user: 'Charlie', avatar: 'https://placehold.co/40x40.png', hint: "man smiling", text: 'What are we discussing today?', time: '10:02 AM', isSender: false },
        { id: 4, user: 'Alice', avatar: 'https://placehold.co/40x40.png', hint: "woman thinking", text: 'I was wondering if anyone has experience with the new AI models for predictive maintenance in manufacturing?', time: '10:05 AM', isSender: false },
        { id: 5, user: 'You', avatar: 'https://placehold.co/40x40.png', hint: "user avatar", text: 'Yes, I\'ve been looking into that! Specifically for a project involving CNC machines. The data processing is a challenge.', time: '10:07 AM', isSender: true },
    ],
    'ai-robotics': [
        { id: 1, user: 'Eve', avatar: 'https://placehold.co/40x40.png', hint: "woman coding", text: 'Anyone working with ROS 2 and Gazebo simulations for robot arms? I\'m having trouble with joint controllers.', time: '11:00 AM', isSender: false },
        { id: 2, user: 'You', avatar: 'https://placehold.co/40x40.png', hint: "user avatar", text: 'Yes, I am! Make sure your controller configurations are loaded correctly in your launch files. Sometimes it\'s a simple namespace issue.', time: '11:01 AM', isSender: true },
        { id: 3, user: 'Grace', avatar: 'https://placehold.co/40x40.png', hint: "woman engineer", text: 'Also, check the URDF for any inconsistencies in joint definitions. That caught me out once.', time: '11:03 AM', isSender: false },
    ],
    projects: [
        { id: 1, user: 'Heidi', avatar: 'https://placehold.co/40x40.png', hint: "woman presenting", text: 'Just finished my latest project: a smart home automation system using Raspberry Pi and open-source AI for voice commands! It controls lights, temperature, and even makes coffee.', time: '12:00 PM', isSender: false },
        { id: 2, user: 'You', avatar: 'https://placehold.co/40x40.png', hint: "user avatar", text: 'That sounds amazing, Heidi! Would love to see a demo or a blog post about it.', time: '12:02 PM', isSender: true },
    ],
};

// Mock data for DM users
const directMessageUsers = [
    { id: 'sarah_m', name: 'Sarah Miller', avatar: 'https://placehold.co/40x40.png', hint: "woman programmer", online: true, lastMessage: "Working on that new feature now!", time: "10:30 AM" },
    { id: 'david_c', name: 'David Chen', avatar: 'https://placehold.co/40x40.png', hint: "man architect", online: false, lastMessage: "Sounds good, let's sync up tomorrow.", time: "Yesterday" },
    { id: 'lisa_b', name: 'Lisa Brown', avatar: 'https://placehold.co/40x40.png', hint: "woman designer", online: true, lastMessage: "Can you review my PR?", time: "10:15 AM" },
    { id: 'mark_j', name: 'Mark Johnson', avatar: 'https://placehold.co/40x40.png', hint: "man robotics", online: true, lastMessage: "Just pushed the latest updates.", time: "09:50 AM" },
];

// Mock messages for DMs
const mockDirectMessages = {
    sarah_m: [
        { id: 1, user: 'You', avatar: 'https://placehold.co/40x40.png', hint: "user avatar", text: 'Hey Sarah, how is the new feature coming along?', time: '10:25 AM', isSender: true },
        { id: 2, user: 'Sarah Miller', avatar: 'https://placehold.co/40x40.png', hint: "woman programmer", text: 'Working on that new feature now!', time: '10:30 AM', isSender: false },
        { id: 3, user: 'You', avatar: 'https://placehold.co/40x40.png', hint: "user avatar", text: 'Great, let me know if you need any help with testing.', time: '10:31 AM', isSender: true },
    ],
    david_c: [
        { id: 1, user: 'David Chen', avatar: 'https://placehold.co/40x40.png', hint: "man architect", text: 'Project update looks great!', time: 'Yesterday', isSender: false },
        { id: 2, user: 'You', avatar: 'https://placehold.co/40x40.png', hint: "user avatar", text: 'Thanks David!', time: 'Yesterday', isSender: true },
        { id: 3, user: 'David Chen', avatar: 'https://placehold.co/40x40.png', hint: "man architect", text: 'Sounds good, let\'s sync up tomorrow.', time: 'Yesterday', isSender: false },
    ],
    lisa_b: [
        { id: 1, user: 'You', avatar: 'https://placehold.co/40x40.png', hint: "user avatar", text: 'Hi Lisa, saw your message about the PR.', time: '10:10 AM', isSender: true },
        { id: 2, user: 'Lisa Brown', avatar: 'https://placehold.co/40x40.png', hint: "woman designer", text: 'Can you review my PR?', time: '10:15 AM', isSender: false },
        { id: 3, user: 'You', avatar: 'https://placehold.co/40x40.png', hint: "user avatar", text: 'No problem, I\'ll take a look this afternoon!', time: '10:16 AM', isSender: true },
    ],
    mark_j: [
        { id: 1, user: 'Mark Johnson', avatar: 'https://placehold.co/40x40.png', hint: "man robotics", text: 'Just pushed the latest updates to the robotics simulation branch.', time: '09:50 AM', isSender: false },
        { id: 2, user: 'You', avatar: 'https://placehold.co/40x40.png', hint: "user avatar", text: 'Awesome, I\'ll pull them now. Thanks Mark!', time: '09:52 AM', isSender: true },
    ],
};

type Message = {
    id: number;
    user: string;
    avatar: string;
    hint: string;
    text: string;
    time: string;
    isSender: boolean;
};

type ChatRoomType = typeof chatRooms[0];
type DirectMessageUserType = typeof directMessageUsers[0];

export default function CommunityPage() {
    const [activeTab, setActiveTab] = React.useState(chatRooms[0].id);
    const [selectedDmUser, setSelectedDmUser] = React.useState<DirectMessageUserType | null>(null);
    const [activeChatIdInSidebar, setActiveChatIdInSidebar] = React.useState<string | null>(chatRooms[0].id);


    React.useEffect(() => {
        // Set initial active chat in sidebar based on the initial active tab
        if (activeTab !== 'direct_messages') {
            setActiveChatIdInSidebar(activeTab);
        } else if (selectedDmUser) {
            setActiveChatIdInSidebar(selectedDmUser.id);
        } else {
            setActiveChatIdInSidebar('direct_messages'); // Generic ID for the DM list tab itself
        }
    }, [activeTab, selectedDmUser]);


    const currentMessages: Message[] = React.useMemo(() => {
        if (activeTab === 'direct_messages') {
            return selectedDmUser ? (mockDirectMessages[selectedDmUser.id as keyof typeof mockDirectMessages] || []) : [];
        }
        return mockMessages[activeTab as keyof typeof mockMessages] || [];
    }, [activeTab, selectedDmUser]);

    const handleDmUserSelectFromMainList = (user: DirectMessageUserType) => {
        setSelectedDmUser(user);
        setActiveChatIdInSidebar(user.id); // Also update sidebar highlight
    };

    const handleBackToDmList = () => {
        setSelectedDmUser(null);
        setActiveChatIdInSidebar('direct_messages'); // Highlight the main DM tab in sidebar
    };

    const handleSidebarChatSelect = (chat: DirectMessageUserType | ChatRoomType) => {
        if ('online' in chat) { // It's a DM user (checking for a property unique to DM users)
            setActiveTab('direct_messages');
            setSelectedDmUser(chat);
            setActiveChatIdInSidebar(chat.id);
        } else { // It's a room
            setActiveTab(chat.id);
            setSelectedDmUser(null);
            setActiveChatIdInSidebar(chat.id);
        }
    };

    const handleTabChange = (newTabId: string) => {
        setActiveTab(newTabId);
        if (newTabId !== 'direct_messages') {
            setSelectedDmUser(null); // Clear selected DM if switching to a room
            setActiveChatIdInSidebar(newTabId);
        } else {
            if (selectedDmUser) {
                setActiveChatIdInSidebar(selectedDmUser.id);
            } else {
                setActiveChatIdInSidebar('direct_messages');
            }
        }
    };


    const ChatView = ({ messages, chatTitle, onBack }: { messages: Message[], chatTitle: string, onBack?: () => void }) => (
        <Card className="border-border shadow-inner bg-card h-full flex flex-col">
            {/* CardHeader removed as per user request */}
            <CardContent className="p-0 flex-grow overflow-hidden">
                <ScrollArea className="h-full w-full p-4">
                    <div className="space-y-6">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={cn(
                                    "flex items-start gap-3",
                                    msg.isSender ? "flex-row-reverse" : "flex-row"
                                )}
                            >
                                <Avatar className="h-10 w-10 border-2 border-primary/30 shadow-sm">
                                    <AvatarImage src={msg.avatar} alt={msg.user} data-ai-hint={msg.hint} />
                                    <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
                                        {msg.user.substring(0, 1).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div
                                    className={cn(
                                        "rounded-xl p-3 shadow-md max-w-[70%] md:max-w-[60%]",
                                        msg.isSender
                                            ? "bg-accent text-accent-foreground rounded-br-none"
                                            : "bg-muted text-foreground rounded-bl-none"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "flex items-baseline gap-2 mb-1",
                                            msg.isSender ? "flex-row-reverse" : ""
                                        )}
                                    >
                                        {!msg.isSender && <p className="text-sm font-semibold text-accent">{msg.user}</p>}
                                        <p
                                            className={cn(
                                                "text-xs",
                                                msg.isSender ? "text-accent-foreground/80" : "text-muted-foreground/70"
                                            )}
                                        >
                                            {msg.time}
                                        </p>
                                    </div>
                                    <p
                                        className={cn(
                                            "text-sm",
                                            msg.isSender ? "text-accent-foreground" : "text-foreground/90"
                                        )}
                                    >
                                        {msg.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div className="text-center text-muted-foreground py-6">
                            <p className="text-xs italic">End of messages. This is a placeholder chat UI.</p>
                        </div>
                    </div>
                </ScrollArea>
            </CardContent>
            <div className="p-4 border-t border-border/50 bg-card">
                <form className="flex items-center gap-3">
                    <Input
                        type="text"
                        placeholder="Type your message here..."
                        className="flex-grow bg-background focus:ring-accent border-border placeholder-muted-foreground/80"
                        disabled
                    />
                    <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold" disabled>
                        <Send className="h-4 w-4 mr-2" /> Send
                    </Button>
                </form>
            </div>
        </Card>
    );

    const DMUserList = () => (
        <Card className="border-border shadow-inner bg-card h-full flex flex-col">
            <CardHeader className="border-b border-border/50 pb-3">
                <CardTitle className="font-headline text-xl md:text-2xl text-accent flex items-center gap-2">
                    <UserIcon className="h-6 w-6" /> Direct Messages
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-grow overflow-hidden">
                <ScrollArea className="h-full w-full">
                    <div className="divide-y divide-border/50">
                        {directMessageUsers.map((user) => (
                            <button
                                key={user.id}
                                onClick={() => handleDmUserSelectFromMainList(user)}
                                className="flex items-center w-full p-4 hover:bg-accent/10 transition-colors duration-150 text-left focus:outline-none focus:bg-accent/20"
                            >
                                <Avatar className="h-12 w-12 mr-4 border-2 border-primary/20 shadow-sm">
                                    <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.hint} />
                                    <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
                                        {user.name.substring(0, 1).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-grow overflow-hidden">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-foreground truncate">{user.name}</h3>
                                        <span className="text-xs text-muted-foreground">{user.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-1">
                                        <p className="text-sm text-muted-foreground truncate">{user.lastMessage}</p>
                                        {user.online && <Circle className="h-2.5 w-2.5 fill-green-500 text-green-500 ml-2" />}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );

    return (
        <div className="flex h-[calc(100vh-10rem)] max-w-full mx-auto">
            {/* Left Sidebar */}
            <div className="w-80 p-4 border-r border-border hidden md:flex md:flex-col">
                <Card className="h-full flex flex-col shadow-md">
                    <CardHeader className="py-4 px-3 border-b border-border">
                        <CardTitle className="font-headline text-xl text-accent">Chats</CardTitle>
                    </CardHeader>
                    <ScrollArea className="flex-grow">
                        <CardContent className="p-2">
                            <div className="mb-4">
                                <p className="text-xs font-semibold text-muted-foreground px-2 mb-2 mt-1">CHANNELS</p>
                                {chatRooms.filter(r => r.id !== 'direct_messages').map((room) => (
                                    <Button
                                        key={room.id}
                                        variant={activeChatIdInSidebar === room.id ? "secondary" : "ghost"}
                                        className="w-full justify-start h-10 mb-1 text-sm"
                                        onClick={() => handleSidebarChatSelect(room)}
                                    >
                                        {React.cloneElement(room.icon, { className: "h-4 w-4 mr-2 opacity-80" })}
                                        {room.name}
                                    </Button>
                                ))}
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-muted-foreground px-2 mb-2">DIRECT MESSAGES</p>
                                {directMessageUsers.map((user) => (
                                    <Button
                                        key={user.id}
                                        variant={activeChatIdInSidebar === user.id ? "secondary" : "ghost"}
                                        className="w-full justify-start h-auto py-2 px-2 mb-1 text-left"
                                        onClick={() => handleSidebarChatSelect(user)}
                                    >
                                        <Avatar className="h-9 w-9 mr-3 flex-shrink-0">
                                            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint={user.hint} />
                                            <AvatarFallback className="text-xs">{user.name.substring(0, 1)}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-grow overflow-hidden">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-sm truncate">{user.name}</span>
                                                {user.online && <Circle className="h-2 w-2 fill-green-500 text-green-400 ml-1 flex-shrink-0" />}
                                            </div>
                                            <p className="text-xs text-muted-foreground truncate">{user.lastMessage}</p>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </ScrollArea>
                </Card>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 p-0 md:p-4 overflow-hidden">
                <Card className="h-full flex flex-col shadow-none md:shadow-xl border-0 md:border border-border">
                    <CardContent className="p-2 md:p-4 flex-grow overflow-hidden">
                        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full h-full flex flex-col">
                            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 mb-4 bg-card p-1 rounded-md">
                                {chatRooms.map((room) => (
                                    <TabsTrigger
                                        key={room.id}
                                        value={room.id}
                                        className="text-sm md:text-base py-2 flex items-center gap-2 text-muted-foreground hover:text-accent hover:bg-accent/10 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground data-[state=active]:shadow-md transition-colors duration-150"
                                    >
                                        {React.cloneElement(room.icon, { className: "h-4 w-4" })} {room.name}
                                    </TabsTrigger>
                                ))}
                            </TabsList>

                            <div className="flex-grow overflow-hidden">
                                {chatRooms.map((room) => (
                                    <TabsContent key={room.id} value={room.id} className="h-full m-0">
                                        {room.id === 'direct_messages' ? (
                                            selectedDmUser ? (
                                                <ChatView messages={currentMessages} chatTitle={selectedDmUser.name} onBack={handleBackToDmList} />
                                            ) : (
                                                <DMUserList />
                                            )
                                        ) : (
                                            <ChatView messages={currentMessages} chatTitle={`${room.name}`} />
                                        )}
                                    </TabsContent>
                                ))}
                            </div>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
