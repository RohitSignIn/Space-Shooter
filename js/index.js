document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("container");
    const spaceship = document.getElementById("spaceship");
    const missile_con = document.getElementById("missile-con");
    const enemy_con = document.getElementById("enemy-con");
    const scoreBoard = document.getElementById("scoreBoard");
    const gameOver = document.getElementById("gameOver");



    // ------ Move SpaceShip Start ------
    let key_pressed = {
        "ArrowUp": false,
        "ArrowDown": false,
        "ArrowLeft": false,
        "ArrowRight": false,
        "space": false,
        "firing": false
    };

    const shipVelocityX = 5;
    const shipVelocityY = 3;
    // let fire_start = false;
    let spaceBlastIntervalId = null;
    let score = 0;
    document.addEventListener("keydown", (e) => {
        
        switch(e.code){
            case "ArrowUp": key_pressed.ArrowUp = true;
            break;

            case "ArrowDown": key_pressed.ArrowDown = true
            break;
            
            case "ArrowLeft": key_pressed.ArrowLeft = true
                break;

            case "ArrowRight": key_pressed.ArrowRight = true
            break;
            
            case "Space": key_pressed.space = true
            break;
        }
        
    })

    document.addEventListener("keyup", (e) => {
        switch(e.code){
            case "ArrowUp": key_pressed.ArrowUp = false
            break;

            case "ArrowDown": key_pressed.ArrowDown = false
            break;
            
            case "ArrowLeft": key_pressed.ArrowLeft = false
                break;

            case "ArrowRight": key_pressed.ArrowRight = false
            break;
            
            case "Space": key_pressed.space = false; key_pressed.firing = false
            break;
        }
    })
    // ------ Move SpaceShip end ------

    function SpaceShipAnimate(){
        requestAnimationFrame(SpaceShipAnimate)

        if(spaceship.offsetTop-spaceship.offsetHeight < container.offsetTop && key_pressed["ArrowUp"] || spaceship.offsetLeft-spaceship.offsetWidth < container.offsetLeft && key_pressed["ArrowLeft"] || spaceship.offsetLeft+spaceship.offsetWidth > container.offsetLeft+container.offsetWidth && key_pressed["ArrowRight"] || spaceship.offsetTop+spaceship.offsetHeight > container.offsetTop+container.offsetHeight && key_pressed["ArrowDown"]){
            return
        }

        let x = 0;
        let y = 0

        if(key_pressed.ArrowUp) y = -shipVelocityY
        if(key_pressed.ArrowDown) y = shipVelocityY
        if(key_pressed.ArrowLeft) x = -shipVelocityX
        if(key_pressed.ArrowRight) x = shipVelocityX
        if(key_pressed.space && !key_pressed.firing){
            launchMissile();
            key_pressed.firing = true;
        }  

        spaceship.style.top = `${spaceship.offsetTop + y}px`;
        spaceship.style.left = `${spaceship.offsetLeft + x}px`;

    }

    SpaceShipAnimate();
    // Missile Fire -- Start --
    function launchMissile(){
        let missile = document.createElement("div");
        missile.setAttribute("class", "missile");
        missile.innerHTML = `<svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink" width="80px" height="40px" viewBox="0 0 512 512"
                    xml:space="preserve">
                    <g>
                        <path class="st0"
                            d="M256,0c-28.938,24.109-40.734,83.984-40.734,128.656h81.469C296.734,83.984,284.953,24.109,256,0z" />
                        <polygon class="st0" points="296.734,405.25 296.734,150.813 215.266,150.813 215.266,405.25 163.797,454.656 163.797,512 
        229.547,512 229.547,427.969 242.063,427.969 242.063,512 269.938,512 269.938,427.969 282.438,427.969 282.438,512 348.203,512 
        348.203,454.656" />
                    </g>
                </svg>`;

        missile_con.appendChild(missile); 
        missile.style.left = `${spaceship.offsetLeft - (spaceship.offsetWidth)/2}px`;
        missile.style.top = `${spaceship.offsetTop}px`;
        const missileMove = missile.animate([{top: "-110%"}], 
        {
            fill: "forwards",
            duration: 4000
        }
        );

        missileMove.addEventListener("finish", (e) => {
            missile.remove();
        })
    }

    function addEnemy(){
        let enemy = document.createElement("div");
        enemy.setAttribute("class", "enemy");
        enemy.innerHTML = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
        <g>
            <rect x="148.211" y="397.474" style="fill:#1E2E3B;" width="215.579" height="53.895" />
            <rect x="222.316" y="249.263" style="fill:#1E2E3B;" width="67.368" height="53.895" />
        </g>
        <path style="fill:#FF5023;" d="M296.421,101.053c0-22.325-18.096-40.421-40.421-40.421s-40.421,18.097-40.421,40.421
c0,14.96,8.133,28.01,20.211,35.001v32.368h40.421v-32.368C288.288,129.063,296.421,116.012,296.421,101.053z" />
        <path style="fill:#BF3C1A;" d="M256,60.632v107.789h20.211v-32.368c12.078-6.99,20.211-20.041,20.211-35.001
C296.421,78.728,278.325,60.632,256,60.632z" />
        <path style="fill:#BFE4F8;" d="M417.684,309.895h-40.421c0-66.865-54.399-121.263-121.263-121.263S134.737,243.03,134.737,309.895
H94.316c0-89.154,72.53-161.684,161.684-161.684S417.684,220.741,417.684,309.895z" />
        <g>
            <path style="fill:#93C7EF;" d="M256,148.211v40.421c66.865,0,121.263,54.399,121.263,121.263h40.421
C417.684,220.741,345.153,148.211,256,148.211z" />
            <path style="fill:#93C7EF;" d="M471.579,357.053c0-8.843,0-18.549,0-26.947c0-22.323-18.097-40.421-40.421-40.421H80.842
c-22.325,0-40.421,18.098-40.421,40.421c0,8.398,0,18.105,0,26.947L0,410.947L471.579,357.053z" />
        </g>
        <g>
            <path style="fill:#5A8BB0;" d="M256,410.947h256l-40.421-53.895c0-8.843,0-18.549,0-26.947c0-22.323-18.097-40.421-40.421-40.421
H256V410.947z" />
            <polygon style="fill:#5A8BB0;"
                points="471.579,357.053 40.421,357.053 0,410.947 256,410.947 	" />
        </g>
        <polygon style="fill:#3C5D76;" points="471.579,357.053 256,357.053 256,410.947 512,410.947 " />
        <g>
            <circle style="fill:#FFDA44;" cx="119.579" cy="357.053" r="20.211" />
            <circle style="fill:#FFDA44;" cx="210.526" cy="357.053" r="20.211" />
        </g>
        <g>
            <circle style="fill:#FF9811;" cx="301.474" cy="357.053" r="20.211" />
            <circle style="fill:#FF9811;" cx="392.421" cy="357.053" r="20.211" />
        </g>
    </svg>`;
    
    enemy_con.appendChild(enemy);
    enemy.style.left = `${Math.floor(Math.random() * 100)}%`;
    const enemyMove = enemy.animate([{top: "110%"}],{
        fill: "forwards",
        // duration: Math.floor(Math.random() * (8000 - 4000 + 1) + 4000)
        duration: 10000
    })

    enemyMove.addEventListener("finish", () => {
        enemy.remove()
    })
    }

    const EnemyAddIntervalId = setInterval(addEnemy, 1000);

    spaceBlastIntervalId = setInterval(hitSpaceship, 100);
    function hitSpaceship(){
        const enemies = document.querySelectorAll("#enemy-con div")
        enemies.forEach((e) => {
            if(e.offsetTop+e.offsetHeight > spaceship.offsetTop && e.offsetTop < spaceship.offsetTop + spaceship.offsetHeight){
                // console.log(e.offsetLeft+36, spaceship.offsetLeft);
                if(e.offsetLeft+e.offsetHeight+36 >= spaceship.offsetLeft && e.offsetLeft+e.offsetHeight+36 <= spaceship.offsetLeft+spaceship.offsetWidth|| e.offsetLeft+36 >= spaceship.offsetLeft && e.offsetLeft+36 <= spaceship.offsetLeft + spaceship.offsetWidth){
                    spaceship.remove();
                    gameOver.style.display = "flex";
                   clearInterval(spaceBlastIntervalId);
                   clearInterval(EnemyAddIntervalId);
                }
            }
        })
        // clearInterval(enemyMove);
    }


    function hitEnemy(){
        const missiles = document.querySelectorAll("#missile-con div");
        missiles.forEach((missile) => {
            const enemies = document.querySelectorAll("#enemy-con div");
            enemies.forEach((enemy) => {
                if(enemy.offsetTop+enemy.offsetHeight > missile.offsetTop && enemy.offsetTop < missile.offsetTop + missile.offsetHeight){
                    if(enemy.offsetLeft+enemy.offsetHeight+36 >= missile.offsetLeft && enemy.offsetLeft+enemy.offsetHeight+36 <= missile.offsetLeft+missile.offsetWidth|| enemy.offsetLeft+36 >= missile.offsetLeft && enemy.offsetLeft+36 <= missile.offsetLeft + missile.offsetWidth){
                        score += 10;
                        scoreBoard.textContent = score;
                        enemy.remove();
                        missile.remove();
                    }
                }
            })
        })
    }

    setInterval(hitEnemy, 200);



})
