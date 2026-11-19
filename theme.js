(function(){
        try{
            const savedTheme = localStorage.getItem("warehouse_theme_v1");
            const useDarkTheme = savedTheme === "dark" ||
                (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);

            if(useDarkTheme){
                document.documentElement.classList.add("dark-mode");
            }
        }catch(error){}
    })();
