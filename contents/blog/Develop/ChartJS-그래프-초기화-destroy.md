---
date: '2023-01-15'
title: 'chart.js 그래프 초기화 - destroy()'
categories: ['ChartJS', 'TypeScript']
summary: '초기에 그래프를 로딩하고 그리는데에는 문제가 없었지만, 다른 나라를 클릭하고 데이터를 불러올때, 기존 그래프가 초기화 되질 않아서 다음과 같이 이슈가 발생했다.'
thumbnail: '../../images/ChartJS.png'
---
## Issue - "Canvas is already in use"
웹팩 번들링 문제를 해결하고 나니, 또 다른 이슈가 발생했었다. ~~산 넘어 산~~

![](https://velog.velcdn.com/images/damin1025/post/3ad00259-a0dc-4322-a127-1233bc165b1b/image.PNG)

구글링 해보니, 꽤 유명한 에러 로그인것 같았다.

초기에 그래프를 로딩하고 그리는데에는 문제가 없었지만, 다른 나라를 클릭하고 데이터를 불러올때, 기존 그래프가 **초기화** 되질 않아서 다음과 같이 이슈가 발생했다. 6일동안 삽질한 결과 다음과 같이 해결할 수 있었다.

### 해결
[chart.js 공식문서](https://www.chartjs.org/docs/latest/developers/api.html) 에서는 기존 차트 instance를 날리고 싶으면 `.destroy()` 메소드를 써보라고 합니다. 

>This must be called before the canvas is reused for a new chart.

네 console에 잡혔던 에러랑 똑같은 말을 해주고 있죠,, 이걸로 쇼부를 봅시다.

### 코드
```tsx
import Chart from chart.js/auto

function renderChart(data: number[], labels: string[]) {
  const lineChart = $('#lineChart') as HTMLCanvasElement;
  const ctx = lineChart.getContext('2d');
  if (Chart.getChart(lineChart)) {
    Chart.getChart(lineChart)?.destroy();
  }

  Chart.defaults.color = '#f5eaea';
  Chart.defaults.font.family = 'Exo 2';
  if (!ctx) {
    return;
  }
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Confirmed for the last two weeks',
          backgroundColor: '#feb72b',
          borderColor: '#feb72b',
          data,
        },
      ],
    },
    options: {
      maintainAspectRatio: false, //차트 그래프 사이즈 고정
    },
  });
}
```
해당 코드에서 3번째 line의 if문을 주목하시면,
1. `Chart.getChart(lineChart)`가 만약 값이 할당되어 있다면 (=그래프가 그려져 있음)
2. 그 차트값을 불러오고, `destroy()` (=그래프 초기화) 

를 의미합니다. 따라서 다음과 같이 코드를 수정 시, 그래프가 동적으로 변하지 않는 이슈가 해결됩니다. 

### +) 타입 강하게 잡아내기 : 옵셔널 체이닝(연산자 : ?)
이때 `Chart.getChart(lineChart)?.destroy();` 이게 뭔가 싶으실텐데요
해당 연산자는 **Optional Chaining** 이라고 다음 코드와 동일한 의미를 갖습니다.  

```js
if (Chart.getChart(lineChart) === null 
    || Chart.getChart(lineChart) === undefined) { 
  return; 
}
else { 
  Chart.getChart(lineChart).destroy(); 
}
```
`Chart.getChart(lineChart)` 가 `null` 또는 `undefined`에 해당하지 않는다면(=그래프가 이미 그려져 있는 상태) `destroy()` 하라는것과 동일한 의미를 지닙니다. 