import { Module } from '@nestjs/common'

import { RepoService } from './repo.service'
import { MongooseModule } from '@nestjs/mongoose'
import { BINGO, BINGOSchema } from '../repository/schemas/bingo.schema'
import { BONANZA, BONANZASchema } from '../repository/schemas/bonanza.schema'
import { CLUB_MASTER, CLUB_MASTERSchema } from './schemas/club-master.schema'
import { DIAMOND, DIAMONDSchema } from '../repository/schemas/diamond.schema'
import { ENUGU, ENUGUSchema } from '../repository/schemas/enugu.schema'
import { FAIR_CHANCE, FAIR_CHANCESchema } from '../repository/schemas/fairchance.schema'
import { FORTUNE, FORTUNESchema } from '../repository/schemas/fortune.schema'
import { GOLD, GOLDSchema } from '../repository/schemas/gold.schema'
import { INTERNATIONAL, INTERNATIONALSchema } from '../repository/schemas/international.schema'
import { JACKPOT, JACKPOTSchema } from '../repository/schemas/jackpot.schema'
import { KING, KINGSchema } from '../repository/schemas/king.schema'
import { LUCKY_G, LUCKY_GSchema } from '../repository/schemas/lucky-g.schema'
import { LUCKY, LUCKYSchema } from '../repository/schemas/lucky.schema'
import { MARK_II, MARK_IISchema } from '../repository/schemas/mark-II.schema'
import { METRO, METROSchema } from '../repository/schemas/metro.schema'
import { MID_WEEK, MID_WEEKSchema } from '../repository/schemas/mid-week.schema'
import { MSP, MSPSchema } from '../repository/schemas/msp.schema'
import { NATIONAL, NATIONALSchema } from '../repository/schemas/national.schema'
import { O6, O6Schema } from '../repository/schemas/o6.schema'
import { PEOPLES, PEOPLESSchema } from '../repository/schemas/peoples.schema'
import { ROYAL, ROYALSchema } from '../repository/schemas/royal.schema'
import { SUPER, SUPERSchema } from '../repository/schemas/super.schema'
import { TOTA, TOTASchema } from '../repository/schemas/tota.schema'
import { VAG, VAGSchema } from '../repository/schemas/vag.schema'
import { GAMEYEARS, GAMEYEARSSchema } from './schemas/years.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BINGO.name, schema: BINGOSchema },
      { name: BONANZA.name, schema: BONANZASchema },
      { name: CLUB_MASTER.name, schema: CLUB_MASTERSchema },
      { name: DIAMOND.name, schema: DIAMONDSchema },
      { name: ENUGU.name, schema: ENUGUSchema },
      { name: FAIR_CHANCE.name, schema: FAIR_CHANCESchema },
      { name: FORTUNE.name, schema: FORTUNESchema },
      { name: GOLD.name, schema: GOLDSchema },
      { name: INTERNATIONAL.name, schema: INTERNATIONALSchema },
      { name: JACKPOT.name, schema: JACKPOTSchema },
      { name: KING.name, schema: KINGSchema },
      { name: LUCKY_G.name, schema: LUCKY_GSchema },
      { name: LUCKY.name, schema: LUCKYSchema },
      { name: MARK_II.name, schema: MARK_IISchema },
      { name: METRO.name, schema: METROSchema },
      { name: MID_WEEK.name, schema: MID_WEEKSchema },
      { name: MSP.name, schema: MSPSchema },
      { name: NATIONAL.name, schema: NATIONALSchema },
      { name: O6.name, schema: O6Schema },
      { name: PEOPLES.name, schema: PEOPLESSchema },
      { name: ROYAL.name, schema: ROYALSchema },
      { name: SUPER.name, schema: SUPERSchema },
      { name: TOTA.name, schema: TOTASchema },
      { name: VAG.name, schema: VAGSchema },
      { name: GAMEYEARS.name, schema: GAMEYEARSSchema },
    ]),
  ],
  controllers: [],
  providers: [RepoService],
  exports: [RepoService],
})
export class RepoModule {}
