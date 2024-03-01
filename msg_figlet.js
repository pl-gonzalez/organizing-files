import figlet from 'figlet';
import gradient from 'gradient-string';

const timer = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

export async function introMsg(msg){
    figlet(msg, function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    console.log(gradient('pink', 'cyan')(data))
    });
    await timer();
    console.log('\n\n')
}


