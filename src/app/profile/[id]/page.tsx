export default async function UserProfile({params}:any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile page</p>
            <span className="p-2 ml-2rounded bg-orange-500 rounded-lg text-black ">
                { params.id}
            </span>
        </div>
        
    );
}