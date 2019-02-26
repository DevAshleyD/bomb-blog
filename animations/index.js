import anime from 'animejs'

export const svgAnimations = {
    flare: (element) => {
        const initialValue = "583.795 58.2335 610.966 124.102 641.43 68.1138 634.843 132.335 664.484 113.398 649.663 147.979 709.768 135.629 644.723 172.68 719.648 188.323 648.84 192.44 685.891 227.021 635.666 210.554 643.076 261.602 609.319 213.024 593.675 283.009 584.618 216.317 545.921 248.428 578.031 203.144 517.103 213.847 566.505 182.56 492.403 156.213 573.091 156.213 501.46 102.695 596.145 134.805"
        const nextValue = initialValue.split(' ').map((val, i) => i === 0 ? val : String(Math.random() * Number(val))).join(' ')
        return anime({
            targets: element,
            points: [{
                value: initialValue
            }, {
                value: nextValue
            }
            ],
            easing: 'linear',
            duration: 2000,
            loop: true
        })
    }
}