<script>
export default {
  computed: {
    formatTime() {
      return (duration) => {
        var seconds = duration;
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds - hours * 3600) / 60);
        seconds = seconds - hours * 3600 - minutes * 60;
  
        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        var time = hours + ":" + minutes + ":" + seconds;
        return time;
      };
    },
  },
};
</script>