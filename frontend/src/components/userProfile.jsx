// eslint-disable-next-line react/prop-types
const UserProfileCard = ({ user }) => {
    // eslint-disable-next-line react/prop-types
    const { firstName, lastName, photoUrl, age, gender, about } = user;
  
    return (
      <div className="flex  flex-col card shadow-blue-600  bg-base-100 shadow-sm w-80 mt-10"> 
        {/* Set fixed height for consistent display */}
        
        {/* Image Section */}
        <div className="flex-2 h-2/3"> {/* Ensures image takes 2/3 of the card height */}
          <img
            className="w-full h-full object-cover rounded-t-lg" 
            src={photoUrl}
            alt={`${firstName} ${lastName}`}
          />
        </div>
  
        {/* Card Body */}
        <div className="card-body flex-1 h-1/3 flex flex-col justify-between ">
          <div>
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + " , " + gender}</p>}
            <p className="text-sm">{about}</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default UserProfileCard;
  