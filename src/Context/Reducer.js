export let data = {
    currentUser: null ,
    tweets: null ,
    allPosts: [
        {
            dpLink: "https://firebasestorage.googleapis.com/v0/b/twitter-clone-3410b.appspot.com/o/images%2FdpImages%2FAniq.jpg?alt=media&token=f8b9847d-cfed-48d0-aae2-a39e66b58349",
            postDescription: "My New Car!!!",
            postImg:
                "https://firebasestorage.googleapis.com/v0/b/twitter-clone-3410b.appspot.com/o/images%2FpostImages%2Fpic1.jpg?alt=media&token=aae450e2-9d39-4495-ac2e-1684f97f1a20",
            userName:
                "Muhammad Aniq"
        },
        {
            dpLink:
                "https://firebasestorage.googleapis.com/v0/b/twitter-clone-3410b.appspot.com/o/images%2FdpImages%2FHamza.jpg?alt=media&token=f4a5faf4-3f54-4aef-aa2f-ec4e8c36eb53",
            postDescription:
                "Life Lessons",
            postImg:
                "https://firebasestorage.googleapis.com/v0/b/twitter-clone-3410b.appspot.com/o/images%2FpostImages%2Fpic2.jpg?alt=media&token=ff88f8aa-d642-4c52-b7cc-866c7a78058a",
            userName:
                "Muhammad Hamza"
        },{
            dpLink: "https://firebasestorage.googleapis.com/v0/b/twitter-clone-3410b.appspot.com/o/images%2FdpImages%2FAniq.jpg?alt=media&token=f8b9847d-cfed-48d0-aae2-a39e66b58349",
            postDescription: "My New Car!!!",
            postImg:
                "https://firebasestorage.googleapis.com/v0/b/twitter-clone-3410b.appspot.com/o/images%2FpostImages%2Fpic1.jpg?alt=media&token=aae450e2-9d39-4495-ac2e-1684f97f1a20",
            userName:
                "Muhammad Aniq"
        }
    ]
}

export function reducer(state, action) {

    switch (action.type) {
        case "CURRENT_USER": {
            console.log(action.payload)
            return {
                ...state,    
                currentUser: action.payload
            }
        }
        case "ALL_POST" : {
            let allPostClone = state.allPosts.slice(0);
            allPostClone.push(action.payload);
            return {
                ...state,
                allPosts: allPostClone
            }
        }
        // case "ALL_USERS_INFO" : {
        //     let allUsersInfoClone = state.allUsersInfo.slice(0);
        //     allUsersInfoClone.push(action.payload);
        //     return {
        //         ...state,
        //         allUsersInfo: allUsersInfoClone
        //     }
        // }
        default:
            return state;

    }
}