import Carousel from '@/components/Carousel'
import Carousel2 from '@/components/Carousel2'
import Carousel3 from '@/components/Carousel3'
import Amazoncar from '@/components/Amazoncar'
import React from 'react'

const array = [
  {cardName: 'Card 1',cardSubTitle: "Sub-1", ID: 1, image: 'https://img.freepik.com/free-vector/cute-man-woman-couple-sitting-sport-car-city-cartoon-vector-icon-illustration-people-flat_138676-10620.jpg?uid=R179377258&ga=GA1.1.216084302.1734337946&semt=ais_hybrid'},
  {cardName: 'Card 2',cardSubTitle: "Sub-2", ID: 2, image: 'https://img.freepik.com/premium-photo/street-with-yellow-cabs-palm-trees-side_116079-7467.jpg?uid=R179377258&ga=GA1.1.216084302.1734337946&semt=ais_hybrid'},
  {cardName: 'Card 3',cardSubTitle: "Sub-3", ID: 3, image: 'https://img.freepik.com/premium-photo/retro-style-art_551707-92929.jpg?uid=R179377258&ga=GA1.1.216084302.1734337946&semt=ais_hybrid'},
  {cardName: 'Card 4',cardSubTitle: "Sub-4", ID: 4, image: 'https://img.freepik.com/free-vector/cute-astronaut-waving-hand-game-controller-cartoon-vector-icon-illustration-technology-science-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3714.jpg?t=st=1738330551~exp=1738334151~hmac=44344fbb0639cefaeca577aac539e33156f8790a6559be5b52d7451be10e6fc8&w=1060'},
  {cardName: 'Card 5',cardSubTitle: "Sub-5", ID: 5, image: 'https://img.freepik.com/premium-photo/retro-style-art_551707-70200.jpg?uid=R179377258&ga=GA1.1.216084302.1734337946&semt=ais_hybrid'},
  {cardName: 'Card 6',cardSubTitle: "Sub-6", ID: 6, image: 'https://img.freepik.com/free-vector/vector-city-with-palms-tower-background-template_1441-2949.jpg?uid=R179377258&ga=GA1.1.216084302.1734337946&semt=ais_hybrid'},
  {cardName: 'Card 7',cardSubTitle: "Sub-7", ID: 7, image: 'https://img.freepik.com/free-photo/sunrise-bali-jungle_1385-1644.jpg?t=st=1738330801~exp=1738334401~hmac=71397d4ef96ca50b86f87b104335f4c3c2cb0feeb0c3c74a4be90c6b5169ab2d&w=900'},
  {cardName: 'Card 8',cardSubTitle: "Sub-8", ID: 8, image: 'https://img.freepik.com/free-photo/8-bit-graphics-pixels-scene-with-taxi_23-2151120950.jpg?uid=R179377258&ga=GA1.1.216084302.1734337946&semt=ais_hybrid'},
  {cardName: 'Card 9',cardSubTitle: "Sub-9", ID: 9, image: 'https://img.freepik.com/premium-photo/retro-style-art_551707-70717.jpg?uid=R179377258&ga=GA1.1.216084302.1734337946&semt=ais_hybrid'},
  {cardName: 'Card 10',cardSubTitle: "Sub-10", ID: 10, image: 'https://img.freepik.com/free-photo/miami-bayside-marketplace_23-2151599630.jpg?uid=R179377258&ga=GA1.1.216084302.1734337946&semt=ais_hybrid'},
]

const page = () => {
  return (
    <div className='text-2xl text-black'>
      <div></div>
      <Carousel array={array} isDisabled={false} isAutoChange={true} autoScrollTimer={4}/>
      <Amazoncar array={array}/>
      {/* <div className='card py-4 bg-red-50'>
        <Carousel2 array={array}/>
      </div>
      <div className='card py-4 bg-red-50'>
        <Carousel3 cards={array}/>
      </div> */}
    </div>
  )
}

export default page