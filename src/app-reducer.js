


let initialState={
    users:[],
    urls:[],
    filter:false,
    filtCards:[]
};


const appReducer=(state = initialState, action)=>{
    switch (action.type) {
        case 'ADD-TEXT':
            state.users.push({url:'',like:null,text:action.text,id:action.id})
          return {...state,users:[...state.users]};
        case 'ADD-PHOTO':
            state.urls.push(action.url)
            
            state.users.forEach((item,i)=>{
                item.url=`https://cataas.com${state.urls[i]}`
            })
        return {...state,users:[...state.users]};
        case 'ADD-ID':
            let count=0;
            state.users.forEach(item=>{
                item.id=count;
                count++;
            })
        return {...state,users:[...state.users]};
        case 'DELETE':
      
            state.users.forEach((item,i,arr)=>{
                if(item.id===Number(action.id)){
                    arr.splice(i,1);
                  
                }
            })
        return {...state,users:[...state.users]};
        case 'LIKE':
           
            state.users.forEach((item,i,arr)=>{
                if(item.id===Number(action.id)){

                    if(item.like===true){
                        item.like=false;
                    }else{
                        item.like=true;
                    }
                  
                }
            })
        return {...state,users:[...state.users]};
        case 'FILT':
            if(state.filter===true){
                state.filter=false;
            }else{
                state.filter=action.bool
                console.log(state.users)
            }   
            
            
    return {...state};
        default:
            return state
    }
};



export const getData = () => async dispatch => {
    await fetch('https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=4')
    .then(response=>response.json()
    .then(items=>{
        let count=0;
        items.forEach((item) => {
            dispatch(addText(item.text))
        });
    })).then(result=>{
        dispatch(addId())
    })
}
export const getPhoto = () => async dispatch => {
    for (let i = 0; i <=4; i++) {
        await fetch('https://cataas.com/cat?json=true')
        .then(response=>response.json())
        .then(items=>{
            dispatch(addPhoto(items.url))
                    
        })
        
    }
    
}


export function addText(text,id) {
    return { type: 'ADD-TEXT', text ,id}
}
export function addPhoto(url) {
    return { type: 'ADD-PHOTO', url }
}
export function addId() {
    return { type: 'ADD-ID'}
}
export function deleteCards(id) {
    return { type: 'DELETE',id}
}
export function setLikes(id) {
    return { type: 'LIKE',id}
}
export function filterCards(bool) {
    return { type: 'FILT',bool}
}
export default appReducer;
