export function updateStudyStreak() {

    const today = new Date()
        .toLocaleDateString();


    let activity = JSON.parse(
        localStorage.getItem("studyActivity")
    ) || [];



    if(!activity.includes(today)){

        activity.push(today);

    }


    localStorage.setItem(
        "studyActivity",
        JSON.stringify(activity)
    );

}




export function calculateStreak(){


    const activity = JSON.parse(

        localStorage.getItem("studyActivity")

    ) || [];



    if(activity.length === 0){

        return 0;

    }



    const dates = activity.map(

        date => new Date(date)

    ).sort(

        (a,b)=> b-a

    );



    let streak = 1;



    for(let i=0;i<dates.length-1;i++){


        const difference =

        (dates[i]-dates[i+1])

        /

        (1000*60*60*24);



        if(difference === 1){

            streak++;

        }

        else{

            break;

        }

    }



    return streak;


}