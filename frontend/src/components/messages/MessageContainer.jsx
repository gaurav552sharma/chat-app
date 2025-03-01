import useConversation from "../../zustand/useConversation";
import { useEffect } from "react";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import { TiMessages } from "react-icons/ti";

const MessageContainer = () => {

	const { selectedConversation, setSelectedConversation } = useConversation();

	useEffect(() => {
		// cleanup function (unmounts)
		return () => setSelectedConversation(null);
	}, [setSelectedConversation]);

	return (
		<div className='md:min-w-[450px] flex flex-col h-full'>
    <>
        {!selectedConversation ? (
            <NoChatSelected />
        ) : (
            <div className='flex flex-col h-full'>
                <div className='bg-slate-500 px-4 py-2 mb-2'>
                    <span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation.fullName}</span>
                </div>
                <div className='flex-grow overflow-y-auto'>
                    <Messages />
                </div>
                <div className='sticky bottom-0'>
                    <MessageInput />
                </div>
            </div>
        )}
    </>
</div>

	);
};
export default MessageContainer;

const NoChatSelected = () => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋  ❄</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};