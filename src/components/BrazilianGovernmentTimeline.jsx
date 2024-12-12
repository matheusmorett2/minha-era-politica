'use client'

import { Bar, BarChart, Cell, Legend, Pie, PieChart, Tooltip, XAxis, YAxis } from 'recharts';
import React, { useRef, useState } from 'react';

export const BrazilianGovernmentTimeline = () => {
  const [birthDate, setBirthDate] = useState('');
  const [politicalAnalysis, setPoliticalAnalysis] = useState(null);
  const captureRef = useRef(null);

  const brazilianPresidents = [
    // Era Vargas e República Nova
    { name: 'Getúlio Vargas', party: 'Sem partido', ideology: 'Centro', start: new Date(1930, 10, 3), end: new Date(1945, 9, 29) },
    { name: 'José Linhares', party: 'Sem partido', ideology: 'Centro', start: new Date(1945, 9, 29), end: new Date(1946, 0, 31) },
    { name: 'Gaspar Dutra', party: 'PSD', ideology: 'Direita', start: new Date(1946, 0, 31), end: new Date(1951, 0, 31) },
    { name: 'Getúlio Vargas', party: 'PTB', ideology: 'Esquerda', start: new Date(1951, 0, 31), end: new Date(1954, 7, 24) },
    { name: 'Café Filho', party: 'PSP', ideology: 'Direita', start: new Date(1954, 7, 24), end: new Date(1955, 10, 8) },
    { name: 'Carlos Luz', party: 'PSD', ideology: 'Direita', start: new Date(1955, 10, 8), end: new Date(1955, 10, 11) },
    { name: 'Nereu Ramos', party: 'PSD', ideology: 'Direita', start: new Date(1955, 10, 11), end: new Date(1956, 0, 31) },
    { name: 'Juscelino Kubitschek', party: 'PSD', ideology: 'Centro', start: new Date(1956, 0, 31), end: new Date(1961, 0, 31) },
    { name: 'Jânio Quadros', party: 'PTN', ideology: 'Direita', start: new Date(1961, 0, 31), end: new Date(1961, 7, 25) },
    { name: 'Ranieri Mazzilli', party: 'PSD', ideology: 'Direita', start: new Date(1961, 7, 25), end: new Date(1961, 8, 7) },
    { name: 'João Goulart', party: 'PTB', ideology: 'Esquerda', start: new Date(1961, 8, 7), end: new Date(1964, 3, 1) },

    // Ditadura Militar
    { name: 'Ranieri Mazzilli', party: 'PSD', ideology: 'Direita', start: new Date(1964, 3, 1), end: new Date(1964, 3, 15) },
    { name: 'Castelo Branco', party: 'ARENA', ideology: 'Direita', start: new Date(1964, 3, 15), end: new Date(1967, 2, 15) },
    { name: 'Costa e Silva', party: 'ARENA', ideology: 'Direita', start: new Date(1967, 2, 15), end: new Date(1969, 7, 31) },
    { name: 'Emílio Médici', party: 'ARENA', ideology: 'Direita', start: new Date(1969, 9, 30), end: new Date(1974, 2, 15) },
    { name: 'Ernesto Geisel', party: 'ARENA', ideology: 'Direita', start: new Date(1974, 2, 15), end: new Date(1979, 2, 15) },
    { name: 'João Figueiredo', party: 'ARENA/PDS', ideology: 'Direita', start: new Date(1979, 2, 15), end: new Date(1985, 2, 15) },

    // Nova República
    { name: 'José Sarney', party: 'PMDB', ideology: 'Centro', start: new Date(1985, 2, 15), end: new Date(1990, 2, 15) },
    { name: 'Fernando Collor', party: 'PRN', ideology: 'Direita', start: new Date(1990, 2, 15), end: new Date(1992, 9, 2) },
    { name: 'Itamar Franco', party: 'PMDB', ideology: 'Centro', start: new Date(1992, 9, 2), end: new Date(1995, 0, 1) },
    { name: 'Fernando Henrique Cardoso', party: 'PSDB', ideology: 'Centro', start: new Date(1995, 0, 1), end: new Date(2003, 0, 1) },
    { name: 'Luiz Inácio Lula da Silva', party: 'PT', ideology: 'Esquerda', start: new Date(2003, 0, 1), end: new Date(2011, 0, 1) },
    { name: 'Dilma Rousseff', party: 'PT', ideology: 'Esquerda', start: new Date(2011, 0, 1), end: new Date(2016, 8, 31) },
    { name: 'Michel Temer', party: 'PMDB', ideology: 'Centro', start: new Date(2016, 8, 31), end: new Date(2019, 0, 1) },
    { name: 'Jair Bolsonaro', party: 'PL', ideology: 'Direita', start: new Date(2019, 0, 1), end: new Date(2023, 0, 1) },
    { name: 'Luiz Inácio Lula da Silva', party: 'PT', ideology: 'Esquerda', start: new Date(2023, 0, 1), end: new Date() }
  ];

  const COLORS = {
    'Esquerda': '#E74C3C',
    'Centro': '#3498DB',
    'Direita': '#2ECC71',
    'PT': '#E74C3C',
    'PSDB': '#3498DB',
    'PMDB': '#9B59B6',
    'PL': '#2ECC71',
    'PRN': '#F39C12',
    'ARENA': '#95A5A6',
    'PSD': '#D35400',
    'PTB': '#8E44AD',
    'Sem partido': '#7F8C8D',
    'PSP': '#16A085',
    'PTN': '#2980B9',
    'ARENA/PDS': '#95A5A6'
  };

  const calculatePoliticalTimeline = (birthDate) => {
    const birth = new Date(birthDate);
    const today = new Date();

    const totalLifespan = (today - birth) / (1000 * 60 * 60 * 24 * 365.25);

    const ideologyTimelines = brazilianPresidents
      .filter(president => president.end > birth && president.start < today)
      .map(president => {
        const start = president.start < birth ? birth : president.start;
        const end = president.end > today ? today : president.end;
        const duration = (end - start) / (1000 * 60 * 60 * 24 * 365.25);
        return {
          ideology: president.ideology,
          party: president.party,
          name: president.name,
          duration: duration,
          percentage: (duration / totalLifespan * 100)
        };
      });

    // Agrupa por presidente (somando os períodos)
    const presidentTotals = ideologyTimelines.reduce((acc, curr) => {
      const existing = acc.find(p => p.name === curr.name);
      if (existing) {
        existing.duration += curr.duration;
        existing.percentage = (existing.duration / totalLifespan * 100);
      } else {
        acc.push({ ...curr });
      }
      return acc;
    }, []);

    // Agrupa por ideologia
    const ideologyData = {};
    ideologyTimelines.forEach(item => {
      if (!ideologyData[item.ideology]) {
        ideologyData[item.ideology] = 0;
      }
      ideologyData[item.ideology] += item.percentage;
    });

    // Agrupa por partido
    const partyData = {};
    ideologyTimelines.forEach(item => {
      if (!partyData[item.party]) {
        partyData[item.party] = 0;
      }
      partyData[item.party] += item.percentage;
    });

    // Converter para arrays e ordenar por porcentagem
    const ideologyBreakdown = Object.entries(ideologyData)
      .map(([ideology, percentage]) => ({
        ideology,
        percentage: parseFloat(percentage.toFixed(2))
      }))
      .sort((a, b) => b.percentage - a.percentage);

    const partyBreakdown = Object.entries(partyData)
      .map(([party, percentage]) => ({
        party,
        percentage: parseFloat(percentage.toFixed(2))
      }))
      .sort((a, b) => b.percentage - a.percentage);

    // Encontra o presidente com mais tempo (considerando todos os mandatos)
    const mostTimePresident = presidentTotals
      .sort((a, b) => b.duration - a.duration)[0];

    return {
      totalYearsNum: totalLifespan,
      totalYears: totalLifespan.toFixed(0),
      ideologyBreakdown,
      partyBreakdown,
      ideologyChartData: ideologyBreakdown.map(i => ({ name: i.ideology, value: i.percentage })),
      partyChartData: partyBreakdown.map(p => ({ name: p.party, value: p.percentage })),
      mostTimePresident: {
        ...mostTimePresident,
        percentage: parseFloat(mostTimePresident.percentage.toFixed(2))
      },
      uniquePresidents: new Set(ideologyTimelines.map(p => p.name)).size
    };
  };

  const handleBirthDateChange = (e) => {
    const birthDate = e.target.value;
    setBirthDate(birthDate);
    setPoliticalAnalysis(calculatePoliticalTimeline(birthDate));
  };

  const renderBarLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width + 5}
        y={y + 15}
        fill="#666"
        textAnchor="start"
      >
        {`${value}%`}
      </text>
    );
  };

  const handleTwitterShare = (analysis) => {
    // Prepara texto mais interessante e legível
    const ideologias = analysis.ideologyBreakdown
      .map(i => `${i.ideology}: ${i.percentage}%`)
      .join('\n');

    const text = `🗳️ Durante meus ${analysis.totalYears} anos de vida:
  
${ideologias}
  
Eu vivi ${analysis.uniquePresidents} presidentes diferentes no Brasil! 
E ${analysis.mostTimePresident.name} foi quem governou por mais tempo (${analysis.mostTimePresident.percentage}% da minha vida)
  
Descubra sua história política em: ${window.location.href}`;

    // Encode e abre URL do Twitter
    const encodedText = encodeURIComponent(text);
    window.open(`https://twitter.com/intent/tweet?text=${encodedText}`, '_blank');
  };


  const captureAndDownload = async (elementRef) => {
    try {
      const html2canvas = (await import('html2canvas')).default;

      const element = elementRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // Melhor resolução
        backgroundColor: '#ffffff',
        useCORS: true,
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        onclone: (doc) => {
          // Ajusta o elemento clonado para captura
          const el = doc.getElementById('capture-area');
          if (el) {
            el.style.padding = '20px';
            el.style.borderRadius = '12px';
            el.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }
        }
      });

      // Cria e baixa a imagem
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = 'minha-jornada-politica.png';
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Erro ao gerar imagem:', error);
      alert('Não foi possível gerar a imagem. Por favor, tente novamente.');
    }
  };


  return (
    <div className="w-full h-full min-h-[100vh] mx-auto p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Minha Era Política</h1>

      <div className="max-w-[350px] mx-auto">
        <label htmlFor="birthDate" className="block mb-2 text-gray-700">
          Insira sua data de nascimento:
        </label>
        <input
          type="date"
          id="birthDate"
          value={birthDate}
          onChange={handleBirthDateChange}
          className="w-full p-3 border-2 border-gray-300 rounded-lg text-black focus:outline-none focus:border-blue-500"
        />
      </div>

      {politicalAnalysis && (
        <>
          <div className="grid md:grid-cols-3 gap-6 mx-auto mt-12" ref={captureRef} id="capture-area">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Distribuição Ideológica</h2>
              <div className="bg-white p-4 rounded-lg shadow mb-4">
                {politicalAnalysis.ideologyBreakdown.map((item, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-black">{item.ideology}</span>
                      <span className="text-gray-600">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: COLORS[item.ideology]
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-3 text-gray-700">Estatísticas Extras</h3>
                <ul className="space-y-2 text-black">
                  <li>
                    <strong>Total de Anos Analisados:</strong> {politicalAnalysis.totalYears} anos
                  </li>
                  <li>
                    <strong>Número de Presidentes:</strong> {politicalAnalysis.uniquePresidents}
                  </li>
                  {politicalAnalysis.mostTimePresident && (
                    <li>
                      <strong>Presidente com Mais Tempo:</strong> {politicalAnalysis.mostTimePresident.name}
                      {` `}({parseInt(politicalAnalysis.mostTimePresident.percentage)}% da sua vida)
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Distribuição por Partido</h2>
              <div className='h-[360px] flex justify-center items-center w-full'>
                <PieChart width={400} height={340}>
                  <Pie
                    data={politicalAnalysis.partyChartData}
                    cx={200}
                    cy={150}
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {politicalAnalysis.partyChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#808080'} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">Detalhamento por Partido</h2>
              <div className='h-[360px] flex justify-center items-center w-full'>
                <BarChart
                  width={400}
                  height={340}
                  data={politicalAnalysis.partyBreakdown}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="party" type="category" width={80} />
                  <Tooltip />
                  <Bar dataKey="percentage" label={renderBarLabel}>
                    {politicalAnalysis.partyBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[entry.party] || '#808080'} />
                    ))}
                  </Bar>
                </BarChart>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={() => handleTwitterShare(politicalAnalysis)}
              className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Compartilhar no Twitter
            </button>

            <button
              onClick={() => captureAndDownload(captureRef)}
              className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
            >
              Salvar como Imagem
            </button>
          </div>
          <footer className="mt-12 pt-6 border-t border-gray-300 text-center text-gray-600">
            Construído por:{' '}
            <a
              href="https://x.com/Morett_the_best"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              @madmorett
            </a>
          </footer>
        </>
      )}
    </div>
  );
};